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
    route('chat/:id?', './routes/Chat.tsx'),
    layout('./routes/Profile.tsx', [
      route('profile/own', './routes/Own.tsx'),
      route('profile/bookmarks', './routes/Bookmarks.tsx'),
      route('profile/history', './routes/History.tsx'),
      route('profile/settings', './routes/Settings.tsx'),
    ]),
    route('user/:id', './routes/User.tsx'),
    route('editor/:id?', './routes/Editor.tsx'),
    route('property/:id', './routes/PropertyPage.tsx'),
    route('register', './routes/Register.tsx'),
    route('login', './routes/Login.tsx'),
    route('invite/:propertyId', './routes/Invite.tsx'),
    // text page
    route('*', './routes/TextPage.tsx'),
  ]),
] satisfies RouteConfig;
