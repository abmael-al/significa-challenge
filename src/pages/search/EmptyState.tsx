export const EmptyState = () => {
    return (
        <div className="empty__state">
            <figure
                className="empty__state__illustration"
            >
                <img 
                    src="/images/illustration-empty-state.png" 
                    alt="An illustrantion used to compose an state of empty screen."
                    width='400px'
                    height='200px'
                    loading='lazy'
                />
            </figure>
            <div className="empty__state__body">
                <h1 className="empty__state__body__title">Don't know what to search?</h1>
                <p className="empty__state__body__copy">Here's an offer you can't refuse</p>
            </div>
        </div>        
    )
}