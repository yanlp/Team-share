<!-- 日常活动报名 -->

<template>
    <div class="com_wrap">
        <slot name="cardbody">
            <div class="extra">
                <a href="activeEnroll/list/" target="_blank">更多&gt;</a>
            </div>
            <p class="activity-empty-info" v-if="contentList.length==0">
                <i class="icon"></i>
                <span class="txt">您暂无可报名的日常活动~</span>
            </p>
            <Row v-else class="activity-list activity-list-style1 daily-activity-list">
                <i-col span="8" v-for="(item, index) in contentList"  class="activity-list-item daily-activity-item" :key="index">
                    <div class="pic">
                        <a :href="getLinkUrl(item)" target="_blank">
                            <img :src="getImgUrl(item.activityImgUrl)" alt="">
                        </a>
                    </div>
                    <div class="info">
                        <div class="title">
                            <a :href="getLinkUrl(item)" :title="item.name" target="_blank">{{item.name}}</a>
                        </div>
                        <div class="other">
                            <span>编号：{{item.id}}</span>
                            <span><i>|</i>创建人：{{item.createPin}}</span>
                        </div>
                        <a :href="getLinkUrl(item)" target="_blank">
                            <i-button type="primary">进入活动</i-button>
                        </a>
                    </div>
                </i-col>
            </Row>
        </slot>
    </div>
</template>

<script>
import util from 'LIBS/util';
import base from 'LIBS/base';
import activeListService from 'SERVICES/activeListService'

export default {
    data(){
        let isNode = this.nodeEnv;
        if(!isNode){
            this.getData();    
        }
        //
        return {
            contentList: []
        }
    },
    props: {
        content: Array,
        moreData: Object,
        nodeEnv:Boolean
    },
    created(){
        let isNode = this.nodeEnv;
        if(isNode){
            this.contentList = this.moreData.content.data.items;
        }
    },
    methods: {
        getData(){
            let paramObj = {
                orderBy: 'beginTime desc',
                onlineFlag: 1,
                pageSize: 6,
                page: 1
            }
            activeListService.getListData(paramObj).then((data) => {
                this.$emit('add-count');
                //
                if(data.isSuccess){
                    this.contentList = data.data.items;
                }
            });
        },
        getImgUrl: function(url){
            let imgUrl = util.getImgUrl(url);
            if(!url){
                imgUrl = base.defaultImgUrl;
            }
            return imgUrl;
        },
        getLinkUrl: function(item){
            let url = item.activityUrl;
            if(item.tags == '1'){
                url = util.getPathUrl(`activeEnrollBlock/?entry=1&activityId=${item.id}`);
            }
            return url;
        }
    }
}
</script>