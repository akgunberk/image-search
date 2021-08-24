import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { LandingScreen, SearchScreen } from "screens";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
      retry: 3,
    },
  },
});

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" children={<SearchScreen />} />
          <Route exact path="/" children={<LandingScreen />} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Router;
