<template>
    <div>用户界面
    <button @click="out">退出</button>
    </div> 
</template>
<script>
export default {
    methods: {
        out() {
            window.sessionStorage.setItem("token", '');
            this.$router.push("/home");
        }
    }
}
</script>