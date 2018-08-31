<!-- 我关注的活动 -->

<template>
    <div class="com_wrap">
        <slot name="cardbody">
            <div class="extra">
                <a href="activeEnroll/list/?isWatchActivity=1" target="_blank">更多&gt;</a>
            </div>
            <div class="my-custom-activity-body">
                <p class="activity-empty-info" v-if="contentList.length==0">
                    <i class="icon"></i>
                    <span class="txt">您暂无可报名的日常活动~</span>
                </p>
                <div v-else class="activity-list">
                    <Row class="activity-list activity-list-style1 daily-activity-list">
                        <i-col span="8" v-for="item in contentListOrder"   :key="item.url" class="activity-list-item daily-activity-item">
                            <div class="pic">
                                <a :href="item.url" target="_blank">
                                    <img :src="getImgUrl(item.img)" alt="">
                                </a>
                            </div>
                            <div class="info">
                                <div class="title">
                                    <a :href="item.url" :title="item.title" target="_blank">{{item.title}}</a>
                                </div>
                                <div class="other">
                                    <span>编号：{{item.activityId}}</span>
                                    <span><i>|</i>创建人：{{item.creator}}</span>
                                    <span v-show="item.remark"><i>|</i>备注：{{item.remark}}</span>
                                </div>
                                <a :href="item.url" target="_blank">
                                    <i-button type="primary">进入活动</i-button>
                                </a>
                            </div>
                        </i-col>
                    </Row>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import IndexService from 'SERVICES/indexService' 
import util from 'LIBS/util'; 
import base from 'LIBS/base';

export default {
    data(){
        return {
            contentList: []
        }
    },
    props: {
        content: Array,
        moreData: Object,
        nodeEnv:Boolean
    },
    computed:{
        contentListOrder(){
            return this.contentList.sort(this.sortSeq);
        }
    },
    created(){
        if(this.content.length>9){
            this.contentList  =this.content;
        }else{
            this.contentList = this.content.slice(0,9)
        }
    },
    methods: {
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
        },
        sortSeq(a, b){
            if(a.seq == b.seq){
                let aTime = new Date(a.modified).getTime();
                let bTime = new Date(b.modified).getTime();
                return bTime - aTime;
            }else{
                return a.seq - b.seq;
            }
        },
    }
}
</script>