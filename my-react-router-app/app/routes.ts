import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layout/layout.tsx", [
        index("routes/home.tsx"),
        route("Stats_Game", "routes/stats_game.tsx"),
    ])
] satisfies RouteConfig;
