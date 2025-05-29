import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/Page.tsx', [
    index('./routes/Landing.tsx'),
    route('search', './routes/Search.tsx'),
    route('chat', './routes/ChatList.tsx'),
    route('chat/:id', './routes/ChatDetail.tsx'),
    route('property/:id', './routes/PropertyPage.tsx'),
    route('register', './routes/Register.tsx'),
    route('login', './routes/Login.tsx'),
  ]),
] satisfies RouteConfig;
