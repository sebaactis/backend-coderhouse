module.exports = {
  apps: [{
    name: "Cluster Project",
    script: "./src/index.jsx",
    watch: false,
    instances: 2,
    ignore_watch: "",
    instance_var: "0",
}]
};
