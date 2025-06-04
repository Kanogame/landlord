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
    //route('service', './routes/TextPage.tsx'),
    //route('contacts', './routes/TextPage.tsx'),
    //route('privacy-policy', './routes/TextPage.tsx'),
    //route('faq', './routes/TextPage.tsx'),
    //// tips
    //route('tips/nalogi', './routes/TextPage.tsx'),
    //route('tips/remont', './routes/TextPage.tsx'),
    //route('tips/raschet', './routes/TextPage.tsx'),
    //route('tips/yuridicheskaya-proverka', './routes/TextPage.tsx'),
    //// offers
    //route('offers/ipoteka', './routes/TextPage.tsx'),
    //route('offers/kredit', './routes/TextPage.tsx'),
    //route('offers/rassrochka', './routes/TextPage.tsx'),
    //route('offers/investitsii', './routes/TextPage.tsx'),
    //route('offers/bonusy', './routes/TextPage.tsx'),
  ]),
] satisfies RouteConfig;
