<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
// 1.props: model, rules
// 2.validate()
export default {
    provide() {
        return {
            form: this // 这里传递的是表单组件的实例
        };
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: Object
    },
    methods: {
        validate(cb) {
            const stacks = this.$children
                .filter(item => item.prop)
                .map(item => item.validate());
            Promise.all(stacks)
                .then(() => {
                    cb(true);
                })
                .catch(() => {
                    cb(false);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>