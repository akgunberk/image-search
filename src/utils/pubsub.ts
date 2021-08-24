export const PubSub = {
  _subscriptions: new Map(),
  clear() {
    this._subscriptions.clear();
  },
  get(key: string) {
    if (!this._subscriptions.has(key)) {
      return this._subscriptions.set(key, new Map()).get(key);
    }
    return this._subscriptions.get(key);
  },
  subscribe(key: string, fn: (payload: any) => void) {
    const subs = this.get(key);
    subs.set(subs.size, fn);

    return function () {
      subs.delete(subs.size);
    };
  },
  dispatch(key: string, payload?: any) {
    this._subscriptions
      .get(key)
      ?.forEach((fn: (payload: any) => void) => fn(payload));
  },
};

export const SUBSCRIPTIONS = {
  SHOW_SPINNER: "SHOW_SPINNER",
  HIDE_SPINNER: "HIDE",
};
