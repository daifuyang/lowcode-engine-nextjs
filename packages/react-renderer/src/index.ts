import React, {
  Component,
  PureComponent,
  createElement,
  createContext,
  forwardRef,
  ReactInstance,
  ContextType,
} from 'react';
import ReactDOM from 'react-dom';
import {
  adapter,
  pageRendererFactory,
  componentRendererFactory,
  blockRendererFactory,
  addonRendererFactory,
  tempRendererFactory,
  rendererFactory,
  types,
} from '@zerocmf/lowcode-renderer-core';
import ConfigProvider from '@alifd/next/lib/config-provider';

adapter.setRuntime({
  Component,
  PureComponent,
  createContext,
  createElement,
  forwardRef,
  findDOMNode: () => {},
});

adapter.setRenderers({
  PageRenderer: pageRendererFactory(),
  ComponentRenderer: componentRendererFactory(),
  BlockRenderer: blockRendererFactory(),
  AddonRenderer: addonRendererFactory(),
  TempRenderer: tempRendererFactory(),
  DivRenderer: blockRendererFactory(),
});

adapter.setConfigProvider(ConfigProvider);

function factory(): types.IRenderComponent {
  const Renderer = rendererFactory();
  return class ReactRenderer extends Renderer implements Component {
    readonly props: types.IRendererProps;

    context: ContextType<any>;

    setState: (state: types.IRendererState, callback?: () => void) => void;

    forceUpdate: (callback?: () => void) => void;

    refs: {
      [key: string]: ReactInstance;
    };

    constructor(props: types.IRendererProps, context: ContextType<any>) {
      super(props, context);
    }

    isValidComponent(obj: any) {
      return obj?.prototype?.isReactComponent || obj?.prototype instanceof Component;
    }
  };
}

export default factory();
