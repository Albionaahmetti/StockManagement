
function NotFound() {
  return (
      <div className="container not-found-page">
          <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                  <h1 className="display-1">404</h1>
                  <h2>Page Not Found</h2>
                  <p className="lead">The page you're looking for doesn't exist.</p>
                  <p>
                      You can try going back to the <a href="/">home page</a> or checking the URL.
                  </p>
                  <button className="btn btn-primary">
                      <a href="/" className="text-white text-decoration-none">
                          Go Home
                      </a>
                  </button>
              </div>
          </div>
      </div>
  );
}

export default NotFound;