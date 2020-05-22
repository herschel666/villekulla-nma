import React from 'react';

type Obj = { [x: string]: string };

interface Props {
  htmlAttributes: Obj;
  headComponents: React.ReactNode[];
  bodyAttributes: Obj;
  preBodyComponents: React.ReactNode[];
  body: string;
  postBodyComponents: React.ReactNode[];
}

const HTML: React.FC<Props> = (props: Props) => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
);

export default HTML;
