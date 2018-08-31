<!-- 精品活动 -->

<template>
<div class="com_wrap">
    <slot name="cardbody">
        <div class="extra">
            <a href="activeEnroll/channelenroll" target="_blank">更多&gt;</a>
        </div>
        <Row class="activity-list best-activity-list">
            <i-col span="6" v-for="item in content"   :key="item.imgUrl" class="activity-list-item best-activity-item">
                <div class="pic"><img :src="item.imgUrl" alt=""></div>
                <div class="info">
                    <div class="title">{{item.title}}</div>
                    <div class="des">{{item.desc}}</div>
                    <a :href="item.jumpUrl" target="_blank">
                        <i-button type="primary">进入活动</i-button>
                    </a>
                </div>
            </i-col>
        </Row>
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