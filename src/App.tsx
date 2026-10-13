import {
  Refine,} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { Layout } from "./components/refine-ui/layout/layout";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import Dashboard from "@/pages/dashboard.tsx";
import {BookOpen, HomeIcon} from "lucide-react";
import SubjectsList from "@/pages/subjects/list.tsx";
import SubjectsCreate from "@/pages/subjects/create.tsx";
import {dataProvider} from "@/providers/data.ts";

function App() {
  // @ts-ignore
  // @ts-ignore
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "U2kkA3-qFUWBM-Zwp9q2",
              }}

              resources={[
                {
                  name: 'Dashboard',
                  list: '/',
                  meta: {label: 'Home', icon: <HomeIcon/>}
                },
                {
                  name:'subjects',
                  list: '/subjects',
                  create: '/subjects/create',
                  meta: {label: 'Subjects', icon: <BookOpen/>}
                }
              ]}
            >
              <Routes>
                  <Route element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }>
                      <Route path = "/" element={<Dashboard />} />
                      <Route path = "subjects">
                          <Route index element={<SubjectsList/>} />
                          <Route path= "create" element={<SubjectsCreate/>} />
                      </Route>
                  </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
