<template>
    <div>
        <!-- 显示label -->
        <label v-if="label">{{ label }}</label>
        <!-- 显示内部表单元素 -->
        <slot></slot>
        <!-- 错误提示信息 -->
        <p v-if="error" class="error">{{ error }}</p>
        <p>{{ form.rules[prop] }}</p>
    </div>
</template>

<script>
import Schema from 'async-validator';
export default {
    inject: ['form'],
    props: {
        label: String,
        prop: String
    },
    data() {
        return {
            error: ''
        };
    },
    mounted() {
        this.$on('validate', () => {
            this.validate();
        });
    },
    methods: {
        validate() {
            const rules = this.form.rules[this.prop];
            const value = this.form.model[this.prop];
            const schema = new Schema({ [this.prop]: rules });
            return schema.validate({ [this.prop]: value }, errors => {
                if (errors) {
                    this.error = errors[0].message;
                } else {
                    this.error = '';
                }
            });
        }
    }
};
</script>

<style>
</style>