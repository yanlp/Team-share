<!-- 楼层list -->

<template>
    <div class="floor-list">
        <div class="floor-list-item" v-for="viewItem in listData">
            <Card v-if="componentMap[viewItem.type]"  dis-hover class="index-card" :class="componentMap[viewItem.type].cls">
                <div slot="title">
                    <i class="icon icon-activity"></i>
                    {{ componentMap[viewItem.type].title }}
                </div>
                <component :is="componentMap[viewItem.type].com" :content="viewItem.content"
                    :more-data="getMoreData(viewItem.type)"
                    @add-count="addCountHander" :node-env="nodeEnv">
                </component>
            </Card>
        </div>
    </div>
</template>
<script>
//import
import jdProfiler from 'LIBS/jdProfiler';
//
import MyFocusActivity from './MyFocusActivity'
import BestActivity from './BestActivity'
import DailyActivity from './DailyActivity'
import Tools from './Tools'

import util from 'LIBS/util';
import base from 'LIBS/base';

export default {
    components : { MyFocusActivity, DailyActivity, BestActivity, Tools },
    data(){
        return {
            componentMap: {
                '001': {
                    title: '我关注的活动',
                    com: 'my-focus-activity',
                    cls: 'my-focus-activity'
                },
                '002': {
                    title: '精品活动报名',
                    com: 'best-activity',
                    cls: 'best-activity'
                },
                '003': {
                    title: '日常活动报名',
                    com: 'daily-activity',
                    cls: 'daily-activity'
                },
                '004': {
                    title: '工具推荐',
                    com: 'tools',
                    cls: 'tools'
                }
            }
        }
    },
    props: {
        listData: Array,
        listMoreData: Object,
        nodeEnv:Boolean
    },
    watch: {
        listData : function(value){
            this.canSee = true;
        }
    },
    methods: {
        getMoreData(type){
            let data = {};
            let isNode = this.nodeEnv;
            if(isNode){
                data.content = this.listMoreData[type];
            }
            return data;
        },
        addCountHander(){
            let count = ++this.listMoreData.showTimeCount;
            if(count == 3){
                base.reportEndTime(jdProfiler, 'point21', this.listMoreData.showTimeStart);
            }
        }
    }
}
</script>