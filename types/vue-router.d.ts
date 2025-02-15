import 'vue-router'

interface WithIcon {
    icon?: FunctionalComponent<SVGAttributes, {}, any, {}>
}

declare module 'vue-router' {
    interface RouteRecordSingleView extends WithIcon {}
    interface RouteRecordRaw extends WithIcon {}
    interface RouteRecordSingleViewWithChildren extends WithIcon {}
    interface RouteRecordMultipleViews extends WithIcon {}
    interface RouteRecordMultipleViewsWithChildren extends WithIcon {}
    interface RouteRecordRedirect extends WithIcon {}
}
