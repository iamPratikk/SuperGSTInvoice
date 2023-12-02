import * as React from "react";
/**
 * Page footer Component
 */

interface FooterViewProps {}

export class FooterView extends React.PureComponent<FooterViewProps> {
  public render() {
    return (
      <React.Fragment>
        <p className="login-footer ">
          <a
            rel="noopener noreferrer"
            href="https://www.filingdoor.in/"
            target="_blank"
          >
            Supported By Filling Door
          </a>
          <span>&#169; 2023, Super GST. All Rights Reserved.</span>
          <a
            rel="noopener noreferrer"
            href="https://knowforth.in/"
            target="_blank"
          >
            Powered by Knowforth Tech LLP
          </a>
        </p>
      </React.Fragment>
    );
  }
}
