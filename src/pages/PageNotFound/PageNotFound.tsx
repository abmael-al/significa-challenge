import { GeneralContainer } from "../../components"
import { Link } from "react-router-dom";
import { ReactComponent as IconArrow } from '../../assets/icons/icon-arrow.svg';

import "./pageNotFound.css";

export const PageNotFound = () => {
    return (
        <section>
            <GeneralContainer
                wrapperClass="pnf__container"
            >
                <div
                    className='pnf__wrapper'
                >
                    <h1 className="pnf__headline">Oops! We couldn't find that page.</h1>
                    <p className="pnf__supporting__text">Maybe you can find what you need here?</p>
                    <Link
                        to='/'
                        className='pnf__link'
                    >
                        <IconArrow 
                            className='pnf__link__icon'
                        />
                        Home
                    </Link>
                </div>
            </GeneralContainer>
        </section>
    )
}
