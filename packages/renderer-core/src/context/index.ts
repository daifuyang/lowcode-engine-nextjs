import adapter from '../adapter';

export default function contextFactory() {
  const { createContext } = adapter.getRuntime();
  const window: any = global;
  let context = window.__appContext;
  if (!context) {
    context = createContext({});
    (window as any).__appContext = context;
  }
  return context;
}
