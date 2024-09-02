import React from 'react';
import DefaultLayout from '../components/DefaultLayout'

export const Home = () => {
  return (
    <div>
      <DefaultLayout>
    <div className="container-fluid p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-lg">
            <div className="card-body">
              <h1 className="display-3">Welcome...</h1>
              <p className="lead">Your back office is ready for action.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>
    </div>
  );
};

