// Fronteiras do projeto, no portão:
// npm run fronteiras
module.exports = {
  forbidden: [
    {
      name: "feature-isolada",
      comment: "Feature não importa outra "
        + "feature. O que duas usam vai "
        + "para compartilhado/.",
      severity: "error",
      from: {
        path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/",
        pathNot: "^src/features/$1/",
      },
    },
    {
      name: "base-nao-conhece-tela",
      comment: "api/ e compartilhado/ "
        + "servem a todos; não importam "
        + "features nem app.",
      severity: "error",
      from: {
        path: "^src/(api|compartilhado)/",
      },
      to: { path: "^src/(features|app)/" },
    },
    {
      name: "sem-ciclo",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: {
      fileName: "tsconfig.app.json" },
  },
};
