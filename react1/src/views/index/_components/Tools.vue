<!-- 工具推荐 -->

<template>
    <div class="com_wrap">
        <slot name="cardbody">
            <ul class="tools-list">
                <li v-for="item in content" :key="item.jumpUrl">
                    <a :href="item.jumpUrl" target="_blank" >
                        <img :src="item.imgUrl" alt="">
                        <div class="title">{{ item.title }}</div>
                    </a>
                </li>
            </ul>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        content: Array,
        moreData: Object,
        nodeEnv:Boolean
    }
}
</script>