<template>
<div></div>
</template>

<script>
import { mapMutations } from "vuex";
export default
{
    methods: {
          ...mapMutations(["setAuth"]),
    },
    mounted() {
        sessionStorage.clear();
    this.setAuth("0")
    this.$router.push("/");
    },
}




</script>