import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'

import { useEventCallback, useEventListener } from './'

declare global {
    interface WindowEventMap {
        'local-storage': CustomEvent,
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

const parseJSON = (value: string | null) => {
    try {
        return value !== undefined ? JSON.parse(value ?? '') : undefined;
    } catch {
        console.log('parsing error on', { value });
        return undefined;
    }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    const readValue = useCallback(() => {
        if(typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (parseJSON(item) as T) : initialValue;
        } catch(error) {
            console.warn(`Error reading local storage key "${key}"`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue: SetValue<T> = useEventCallback((value) => {
        if(typeof window === undefined) {
            console.warn(
                `Tried setting localStorage key "${key}" even though environment is not a client`,
            );
        }

        try {
            const newValue = value instanceof Function ? value(storedValue) : value;

            window.localStorage.setItem(key, JSON.stringify(newValue));

            setStoredValue(newValue);

            window.dispatchEvent(new Event('local-storage'));
        } catch(error) {
            console.warn(
                `Error setting localStorag key "${key}" :`, error
            );
        }
    });

    useEffect(() => {
        setStoredValue(readValue());
    }, []);

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
                return;
            }

            setStoredValue(readValue());
        }, 
        [key, readValue]
    );

    useEventListener('storage', handleStorageChange);

    useEventListener('local-storage', handleStorageChange);

    return [storedValue, setValue];
}   