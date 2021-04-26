import React from 'react';

export class ErrorPage extends React.Component {

    render() {
        return(
            <>
                <div className="error-wrapper">
                    <h2 className="error-page-heading">Oops, something went wrong!</h2>
                    <h4 className="error-page-text">Please, try refreshing the page or try again later.</h4>
                </div> 
            </>
        )
    }
}