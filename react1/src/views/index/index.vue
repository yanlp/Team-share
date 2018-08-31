<style lang="sass" src="./index.scss"></style>
<template>
<div class="wrap">
    <header-bar :cur-id="7"></header-bar>
    <div class="content index">
        <div class="left-con">
            <slides :slideobj="bannerList" :textflag="true" :autoplay-speed="4000" :height="320"></slides>
        </div>
        <div class="right-con">
            <Card dis-hover class="index-card to-be-done">
                <div slot="title">
                    <i class="icon icon-activity"></i>
                    待办事项
                </div>
                <!-- htmlmin:ignore -->
                <div class="bd-info">
                    <!-- <h4><i class="icon"></i>待我审核的素材</h4>
                    <div class="num"> -->
                        <!-- <span>{{materialNum}}</span>个 -->
                        <!-- <a :href="auditPageUrl" target="_blank" class="num-target">{{materialNum}}</a>个
                    </div> -->
                    <ul class="bd-ul">
                        <li class="bd-li">
                            <a :href="canEnrollActivityUrl" target="_blank" clstag="pageclick|keycount|1|daiban_kbmhd">
                                <span class="a-box">可报名活动</span>
                                <span class="num">{{canEnrollNum}}</span>
                            </a>
                        </li>
                        <li class="bd-li">
                            <a :href="precheckMyUrl" target="_blank" clstag="pageclick|keycount|1|daiban_dwsh">
                                <span class="a-box">待我审核</span>
                                <span class="num">{{materialNum}}</span>
                            </a>
                        </li>
                        <li class="bd-li">
                            <a :href="precheckOtherUrl" target="_blank" clstag="pageclick|keycount|1|daiban_dtrsh">
                                <span class="a-box">待他人审核</span>
                                <span class="num">{{precheckOtherNum}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </Card>
            <Card dis-hover class="index-card annoucement">
                <div slot="title">
                    <i class="icon icon-activity"></i>
                    公告
                </div>
                <div class="extra">
                    <a :href="announceMore">更多&gt;</a>
                </div>
                <ul>
                    <li v-for="(item, $index) in showAnnList" v-bind:key="$index">
                        <a :href="getAnnounceLink(item.id)">{{item.title}}</a>
                    </li>
                </ul>
            </Card>
        </div>
        <floor-list :list-data="floorListData" :list-more-data="floorMoreData" :node-env="isNode"></floor-list>
    </div>
    <footer v-show="showFooter">页尾</footer>
</div>
</template>


<script>
//import
import IndexService from 'SERVICES/indexService'
import nodeApiService from 'SERVICES/nodeApiService';

import util from 'LIBS/util';
import base from 'LIBS/base';
import jdProfiler from 'LIBS/jdProfiler';
import HeaderBar from 'COMPONENTS/HeaderBar'
import Slides from 'COMPONENTS/SlideBanner'
import FloorList from './_components/FloorList'

//profiler
let showTimeStart = null;
let showTimeCount = 1;


//
export default {
    components : { HeaderBar, Slides, FloorList },
    data() {
        let isNode = base.checkNodeEnv('isNode');
        showTimeStart = new Date().getTime();
        if(isNode){
            this.getDataFromNode();
        }else{
            this.getData();    
        }
        //
        return {
            bannerList: [],
            announceList: [],
            floorListData: [],
            floorMoreData: {
                showTimeStart: showTimeStart,
                showTimeCount: showTimeCount
            },
            showFooter: false,
            announceMore:util.getPathUrl('ann'),

            canEnrollNum: 0,
            canEnrollActivityUrl:util.getPathUrl('activeEnroll/list/?tab=0&checkEnrollActivity=1'),//可报名活动url
            materialNum: 0,
            precheckMyUrl:util.getPathUrl('activeEnroll/list/?tab=2&checktag=0'),//待我审核页面url
            precheckOtherNum: 0,
            precheckOtherUrl:util.getPathUrl('activeEnroll/list/?tab=2&checktag=1'),//待他人审核页面url
            
            isNode:isNode
        }
    },
    computed: {
        showAnnList:function(){
            let self = this;
            return self.announceList.slice(0, 5);
        }
    },
    created(){
        //等待接口实现即可放开下方的方法
        //this.getToDoNum();
        this.getToDoNum();
    },
    mounted() {
        //init jdProfiler
        jdProfiler.init({
            id: 33467,
            flag: 9,
            profilingRate: 1,
            autoReport: false
        });
        base.eventTrack(); // 埋点
    },
    methods: {
        getData(){
            IndexService.getIndexData().then(data => {
                this.parseData(data);
            });
        },
        parseData(data){
            let sign = util.checkAjaxCallbackCode(data, this.$Message);
            if(sign){
                if(!data.materialNum){
                    data.materialNum = 0;
                }
                this.materialNum = data.materialNum>99? '99+' : data.materialNum;
                this.bannerList = data.bannerList;
                this.announceList = data.announceList;
                this.floorListData = data.floorList;
                //this.dealUrl(this.floorListData);
                // for(let i=0,l=this.bannerList.length;i<l;i++){
                //     for(let key in this.bannerList[i]){ 
                //        this.bannerList[i][key] = util.switchHttps(this.bannerList[i][key]);
                //     }
                // }
            }
        },
        getToDoNum(){
            let isHttps = window.location.href.indexOf("https:") > -1;
            let rootPath = nodeApiService.getRootPath(isHttps);
            let urls =[{
                url: rootPath.rootPathBj+'/activity/count',
                method: 'POST',
                params: {
                    onlineFlag: 1,
                    applyValidStatus: 1,
                },
            },{
                url: rootPath.rootPathBj+'/check/pass/count',
                method: 'POST',
            }];
            let paramObj = {
                urls: JSON.stringify(urls)
            }
            nodeApiService.comboRequest(paramObj).then((data) => {
                if(!data || data.length==0){
                    return ;
                }
                if(data[0]){
                    /*let data = data[0];
                    let sign = util.checkAjaxCallbackCode(data, this.$Message);
                    if(sign){
                        if(!data.data){
                            data.data = 0;
                        }
                        this.canEnrollNum = data.data >99? '99+' : data.data;
                    }
                }
                if(data[1]){
                    let data = data[1];
                    let sign = util.checkAjaxCallbackCode(data, this.$Message);
                    if(sign){
                        if(!data.data){
                            data.data = 0;
                        }
                        this.precheckOtherNum = data.data >99? '99+' : data.data;
                    }*/
                    let da = data[0];
                    let sign = util.checkAjaxSuccess(da, this.$Message);
                    if(sign){
                        if(!da.data){
                            da.data = 0;
                        }
                        this.canEnrollNum = da.data >99? '99+' : da.data;
                    }
                }
                if(data[1]){
                    let da1 = data[1];
                    let sign1 = util.checkAjaxSuccess(da1, this.$Message);
                    if(sign1){
                        if(!da1.data){
                            da1.data = 0;
                        }
                        this.precheckOtherNum = da1.data >99? '99+' : da1.data;
                    }
                }
            });
        },
        dealUrl(data){
            let l = data.length;
            let content,contentObj,ll;
            for(let i=0;i<l;i++){
                content = data[i].content;
                ll = content.length;
                for(let j=0;j<ll;j++){
                    contentObj = content[j];
                    for(let key in contentObj){ 
                       contentObj[key] = util.switchHttps(contentObj[key]);
                    }
                }
            }
        },
        getDataFromNode(){
            let isHttps = window.location.href.indexOf("https:") > -1;
            let rootPath = nodeApiService.getRootPath(isHttps);
            let urls =[{
                url: rootPath.rootPath+'/workflowHome',
                method: 'GET'
            },{
                url: rootPath.rootPathBj+'/activity/page',
                method: 'POST',
                params: {
                    orderBy: 'beginTime desc',
                    onlineFlag: 1,
                    pageSize: 6,
                    page: 1
                }
            }];
            let paramObj = {
                urls: JSON.stringify(urls)
            }
            nodeApiService.comboRequest(paramObj).then((data) => {
                base.reportEndTime(jdProfiler, 'point22', showTimeStart);
                //index
                this.parseData(data[0]);
                //other
                this.floorMoreData['003'] = data[1];
            });
        }, 
        getAnnounceLink(id){
            return this.announceMore+'#ann'+id;
        }
    }
}
</script>