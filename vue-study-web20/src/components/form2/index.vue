<template>
    <div>
        <!-- <ElementTest></ElementTest> -->

        <!-- KForm -->
        <KForm :model="model" :rules="rules" ref="loginForm">
            <KFormItem label="用户名" prop="username">
                <KInput
                    v-model="model.username"
                    placeholder="请输入用户名"
                ></KInput>
            </KFormItem>
            <KFormItem label="密码" prop="password">
                <KInput
                    v-model="model.password"
                    placeholder="请输入密码"
                ></KInput>
            </KFormItem>
            <KFormItem>
                <button @click="login">登录</button>
            </KFormItem>
        </KForm>
    </div>
</template>

<script>
import ElementTest from '@/components/form2/ElementTest.vue';
import KInput from '@/components/form2/KInput.vue';
import KFormItem from '@/components/form2/KFormItem.vue';
import KForm from '@/components/form2/KForm.vue';
import create from '@/utils/create2';
import Notice from '@/components/Notice.vue';

export default {
    components: {
        ElementTest,
        KInput,
        KFormItem,
        KForm
    },
    data() {
        return {
            model: {
                username: 'tom',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名' }],
                password: [{ required: true, message: '请输入密码' }]
            },
            xxx: ''
        };
    },
    methods: {
        login() {
            this.$refs.loginForm.validate(isValid => {
                console.log('rd: login -> isValid', isValid);
                // this.$notice({})
                // 创建notice实例
                create(Notice, {
                    title: '村长喊你来搬砖',
                    message: isValid ? '请求登录' : '校验失败',
                    duration: 3000
                }).show();
                // if (isValid) {
                //   // 合法
                //   console.log("request login");
                // } else {
                //   alert("校验失败！");
                // }
            });
        }
    }
};
</script>

<style scoped>
</style>