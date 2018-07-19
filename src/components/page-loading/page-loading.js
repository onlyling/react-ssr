import React from 'react';

export default ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div className="app-page-loading">Loading...</div>;
    } else if (error) {
        // Handle the error state
        return (
            <div className="app-page-loading">
                Sorry, there was a problem loading the page.
            </div>
        );
    } else {
        return null;
    }
};
