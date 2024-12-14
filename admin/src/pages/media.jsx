import React from "react";
import { Link } from "react-router-dom";

const media = () => {
  return (
    <>
    <div className="main-content">
        <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">File Upload</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link href="javascript: void(0);">Forms</Link>
                    </li>
                    <li className="breadcrumb-item active">File Upload</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Dropzone</h4>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    DropzoneJS is an open source library that provides
                    drag’n’drop file uploads with image previews.
                  </p>
                  <div className="dropzone dz-clickable">
                    <div className="dz-message needsclick">
                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                    </div>
                  </div>
                  <ul className="list-unstyled mb-0" id="dropzone-preview"></ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12">
              <div className="justify-content-between d-flex align-items-center mb-3">
                <h5 className="mb-0 pb-1 text-decoration-underline">
                  Filepond
                </h5>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Multiple File Upload</h4>
                    </div>
                    <div className="card-body">
                      <p className="text-muted">
                        FilePond is a JavaScript library that optimizes multiple
                        images for faster uploads and offers a great,
                        accessible, silky smooth user experience.
                      </p>
                      <div
                        className="filepond--root filepond filepond-input-multiple filepond--hopper"
                        data-style-button-remove-item-position="left"
                        data-style-button-process-item-position="right"
                        data-style-load-indicator-position="right"
                        data-style-progress-indicator-position="right"
                        data-style-button-remove-item-align="false"
                        style={{ height: 76 }}
                      >
                        <input
                          className="filepond--browser"
                          type="file"
                          id="filepond--browser-uwo3rlw00"
                          name="filepond"
                          aria-controls="filepond--assistant-uwo3rlw00"
                          aria-labelledby="filepond--drop-label-uwo3rlw00"
                          multiple
                        />
                        <Link
                          className="filepond--credits"
                          aria-hidden="true"
                          href="https://pqina.nl/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ transform: "translateY(68px)" }}
                        >
                          Powered by PQINA
                        </Link>
                        <div
                          className="filepond--drop-label"
                          style={{
                            transform: "translate3d(0px, 0px, 0px)",
                            opacity: 1,
                          }}
                        >
                          <label
                            htmlFor="filepond--browser-uwo3rlw00"
                            id="filepond--drop-label-uwo3rlw00"
                            aria-hidden="true"
                          >
                            Drag &amp; Drop your files or{" "}
                            <span
                              className="filepond--label-action"
                              tabIndex={0}
                            >
                              Browse
                            </span>
                          </label>
                        </div>
                        <div
                          className="filepond--list-scroller"
                          style={{ transform: "translate3d(0px, 60px, 0px)" }}
                        >
                          <ul className="filepond--list" role="list" />
                        </div>
                        <div
                          className="filepond--panel filepond--panel-root"
                          data-scalable="true"
                        >
                          <div className="filepond--panel-top filepond--panel-root" />
                          <div
                            className="filepond--panel-center filepond--panel-root"
                            style={{
                              transform:
                                "translate3d(0px, 8px, 0px) scale3d(1, 0.6, 1)",
                            }}
                          />
                          <div
                            className="filepond--panel-bottom filepond--panel-root"
                            style={{ transform: "translate3d(0px, 68px, 0px)" }}
                          />
                        </div>
                        <span
                          className="filepond--assistant"
                          id="filepond--assistant-uwo3rlw00"
                          role="status"
                          aria-live="polite"
                          aria-relevant="additions"
                        />
                        <div className="filepond--drip" />
                        <fieldset className="filepond--data" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">
                        Profile Picture Selection
                      </h4>
                    </div>
                    <div className="card-body">
                      <p className="text-muted">
                        FilePond is a JavaScript library with profile
                        picture-shaped file upload variation.
                      </p>
                      <div className="avatar-xl mx-auto">
                        <div
                          className="filepond--root filepond filepond-input-circle filepond--hopper"
                          data-style-panel-layout="compact circle"
                          data-style-button-remove-item-position="left bottom"
                          data-style-button-process-item-position="right bottom"
                          data-style-load-indicator-position="center bottom"
                          data-style-progress-indicator-position="right bottom"
                          data-style-button-remove-item-align="false"
                          style={{ height: 120 }}
                        >
                          <input
                            className="filepond--browser"
                            type="file"
                            id="filepond--browser-tijxhkjn9"
                            name="filepond"
                            aria-controls="filepond--assistant-tijxhkjn9"
                            aria-labelledby="filepond--drop-label-tijxhkjn9"
                          />
                          <Link
                            className="filepond--credits"
                            aria-hidden="true"
                            href="https://pqina.nl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ transform: "translateY(120px)" }}
                          >
                            Powered by PQINA
                          </Link>
                          <div
                            className="filepond--drop-label"
                            style={{
                              transform: "translate3d(0px, 0px, 0px)",
                              opacity: 1,
                            }}
                          >
                            <label
                              htmlFor="filepond--browser-tijxhkjn9"
                              id="filepond--drop-label-tijxhkjn9"
                              aria-hidden="true"
                            >
                              Drag &amp; Drop your picture or{" "}
                              <span
                                className="filepond--label-action"
                                tabIndex={0}
                              >
                                Browse
                              </span>
                            </label>
                          </div>
                          <div
                            className="filepond--list-scroller"
                            style={{ transform: "translate3d(0px, 0px, 0px)" }}
                          >
                            <ul className="filepond--list" role="list" />
                          </div>
                          <div
                            className="filepond--panel filepond--panel-root"
                            data-scalable="false"
                          >
                            <div className="filepond--panel-top filepond--panel-root" />
                            <div
                              className="filepond--panel-center filepond--panel-root"
                              style={{
                                transform:
                                  "translate3d(0px, 0px, 0px) scale3d(1, 1.2, 1)",
                              }}
                            />
                            <div
                              className="filepond--panel-bottom filepond--panel-root"
                              style={{
                                transform: "translate3d(0px, 120px, 0px)",
                              }}
                            />
                          </div>
                          <span 
                            className="filepond--assistant"
                            id="filepond--assistant-tijxhkjn9"
                            role="status"
                            aria-live="polite"
                            aria-relevant="additions"
                          />
                          <div className="filepond--drip" />
                          <fieldset className="filepond--data" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default media;
