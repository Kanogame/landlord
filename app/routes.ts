import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/Page.tsx", [
    index("./routes/Landing.tsx"),
    route("search/:id", "./routes/Search.tsx"),
  ]),
] satisfies RouteConfig;
