import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/page.tsx", [
    index("./routes/landing.tsx"),
    route("search/:id", "./routes/search.tsx"),
  ]),
] satisfies RouteConfig;
