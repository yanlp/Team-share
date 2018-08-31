<!-- 我的定制活动 -->

<template>
    <div class="com_wrap">
        <slot name="cardbody">
            <div class="extra">
                <a href="#" @click.prevent="showModalFun" v-el:scroll-custom><i class="icon"></i>定制</a>
            </div>
            <div class="my-custom-activity-body">
                <p class="activity-empty-info" v-show="contentList.length==0"><i class="icon"></i>
                    <span class="txt">点击右侧定制按钮添加您想要的活动吧！</span>
                </p>
                <div v-else class="activity-list">
                    <Row class="activity-list activity-list-style1 daily-activity-list">
                        <i-col span="8" v-for="item in contentList | orderBy sortSeq" class="activity-list-item daily-activity-item">
                            <div class="pic">
                                <a :href="item.url" target="_blank">
                                    <img v-bind:src="getImgUrl(item.img)" alt="">
                                </a>
                            </div>
                            <div class="info">
                                <div class="title" :class="{'invalid-status': item.status == '0'}">
                                    <a :href="item.url" :title="item.title" target="_blank">{{item.title}}</a>
                                    <span class="invalid">已失效</span>
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
        <div></div>
        <!-- modal -->
        <Modal
            :visible.sync="showModal"
            width="590"
            >
            <p slot="header" v-el:scroll-area2>
                定制<span>添加常用的活动，让您报名更高效！</span>
            </p>
            <scrollbar classes="my-scrollbar" v-ref:scrollbar2 v-bind:speed="100" :auto-init="false">
                <div class="scroll-content">
                    <div class="daily-modal-list">
                        <ul>
                            <li v-for="modalItem in modalList | orderBy sortSeq">
                                <div class="info">
                                    <h5>{{modalItem.title}}</h5>
                                    <p>编号：{{modalItem.activityId}}</p>
                                </div>
                                <div class="opt">
                                    <i-button type="primary" @click="editItem(modalItem)">编辑</i-button>
                                    <i-button type="ghost" @click="deletItem(modalItem)">删除</i-button>
                                </div>
                            </li>
                            <li class="daily-item-add"
                                v-show="showAddBtn"
                                @click="addItemBtn"
                                >+</li>
                        </ul>
                        <p class="tip">您还可以添加{{lastNum}}个活动</p>
                    </div>
                    <div v-show="showItemOpt" class="daily-item-form" v-el:daily-form>
                        <h4>{{curStatusTxt}}定制活动</h4>
                        <i-form v-ref:form-inline :model="formInline" :rules="ruleInline" :label-width="60">
                            <Form-item label="活动ID" prop="activityId" v-ref:acitivity-id-item>
                                <Row>
                                    <i-col span="14">
                                        <i-input type="text" :value.sync="formInline.activityId" placeholder="必填"></i-input>
                                    </i-col>
                                    <i-col span="10"></i-col>
                                </Row>
                            </Form-item>
                            <Form-item label="备注" prop="remark">
                                <Row>
                                    <i-col span="14">
                                        <i-input type="text" :value.sync="formInline.remark" placeholder="选填"></i-input>
                                    </i-col>
                                    <i-col span="10" class="tip-input">注:最多展示5个字符</i-col>
                                </Row>
                            </Form-item>
                            <Form-item label="序号" prop="seq">
                                <Row>
                                    <i-col span="14">
                                        <i-input type="text" :value.sync="formInline.seq" placeholder="必填，可用于排序"></i-input>
                                    </i-col>
                                    <i-col span="10"></i-col>
                                </Row>
                            </Form-item>
                            <Form-item class="form-btns">
                                <i-button type="primary" @click="submit">提交</i-button>
                                <i-button type="ghost" @click="cancel">取消</i-button>
                            </Form-item>
                        </i-form>
                    </div>
                </div>
            </scrollbar>
            <!-- <div slot="footer">
                <i-button type="primary" @click="ok">保存</i-button>
                <i-button type="ghost" :loading="modal_loading" @click="cancel">取消</i-button>
            </div> --> 
        </Modal>
    </div>
</template>

<script>
//import
import IndexService from 'SERVICES/IndexService'
import Scrollbar from 'COMPONENTS/Scrollbar/Scrollbar'
import util from 'LIBS/util'
import base from 'LIBS/base'
import urlencode from 'urlencode'

export default {
    components: { Scrollbar },
    data(){
        let isNode = this.nodeEnv;
        if(!isNode){
            this.getData();    
        }
        return {
            contentList: [],
            showModal:false,
            modal_loading: false,
            showItemOpt: false,
            showAddBtn: true,
            //modalList: JSON.parse(JSON.stringify(this.content)),
            modalList: [],
            curStatus: 'add',  //add-新增|edit-编辑
            curItemData: null,
            formInline: {
                activityId: '',
                remark: '',
                seq: ''
            },
            emptyFormInline: {},
            ruleInline: {
                activityId: [
                    { required: true, message: '请填写活动ID', trigger: 'blur' },
                    { type: 'number', max:100000000, message: '请输入有效的活动ID', trigger: 'blur', 
                        transform(value){
                            if(value.length == 0){
                                return value;
                            }else{
                                return Number(value);    
                            }
                        }
                    }
                ],
                seq: [
                    { required: true, message: '请填写序号', trigger: 'blur' },
                    { type: 'number', min: 1, max:9, message: '请输入数字且序号不能大于9', trigger: 'blur', 
                        transform(value){
                            if(value.length != 1){
                                return value;
                            }else{
                                return Number(value);
                            }
                        }
                    }
                ],
                remark: [
                    { type: 'string', max:20, message: '备注过长', trigger: 'blur'}
                ]
            },
            activityIdErrorStatus: false,
        //    activityIdErrorCode: '',
            errorMsg:''
        }
    },
    props: {
        msg: String,
        content: Array,
        moreData: Object,
        nodeEnv:Boolean
    },
    created(){
        let isNode = this.nodeEnv;
        if(isNode){
            this.parseData(this.moreData.content);
        }
    },
    ready(){
        this.emptyFormInline = Object.assign({},this.formInline);
        var refs = this.$refs;
        //for test
        // this.$els.scrollCustom.click();
    },
    computed: {
        curStatusTxt: function(){
            return this.curStatus.match('edit') ? '编辑' : '新增';
        },
        lastNum: function(){
            let max = 9;
            if(this.modalList.length>=max){
                this.showAddBtn = false;
            }else{
                this.showAddBtn = true;
            }
            this.resizeScrollbar();
            return max-this.modalList.length;
        }
    },
    watch: {
        showModal: function(value){
            if(value){
                this.resizeScrollbar('initScrollbar');
            }else{
                this.resetScrollbar();
                this.contentList = JSON.parse(JSON.stringify(this.modalList));
            }
        },
        content: function(){
            // this.modalList = JSON.parse(JSON.stringify(this.content));
        },
        curStatus: function(value){
            //reset
            this.resetForm();
            //check
            if(value == 'add'){//clean data
                 Object.assign(this.formInline, this.emptyFormInline);
            }else if(value.match('edit')){
                let curData = this.curItemData;
                curData.activityId = String(curData.activityId);
                curData.seq = String(curData.seq);
                Object.assign(this.formInline, curData);
            }
        },
        'formInline.activityId': function(value){
            this.activityIdErrorStatus = false;
            this.formInline.activityId = util.stringTrim(value);
        },
        'formInline.remark': function(value){
            this.formInline.remark = util.stringTrim(value);
        }
    },
    methods: {
        //util
        resizeScrollbar: function(fun, scrollEle){
            var scrollbar = this.$refs.scrollbar2;
            var me = this;
            setTimeout(function(){
                if(fun){
                    scrollbar[fun]();
                }else{
                    scrollbar.calculateSize();
                }
                if(scrollEle){
                    var scrollTop = scrollEle.offsetTop;
                    me.moveScrollbar(scrollTop);
                }
            },150);
        },
        moveScrollbar(scrollTop){
            var scrollbar = this.$refs.scrollbar2;
            scrollbar.normalizeVertical(scrollTop);
            scrollbar.moveTheScrollbar();
        },
        getData() {
            IndexService.queryMyCustomizedActivity().then(data => {
                this.$emit('add-count');
                //
                this.parseData(data);
            });
        },
        parseData(data){
            if(data.isSuccess) {
                this.contentList = data.data;
                this.modalList = JSON.parse(JSON.stringify(this.contentList));
                //this.modalList = data.data;
            }
        },
        resetScrollbar(){
            var me = this;
            this.moveScrollbar(0);
            setTimeout(function(){
                me.showItemOpt = false;
                me.resizeScrollbar();
            },500);
            //
            this.resetForm();
            this.curStatus = 'reset';
        },
        activityIdError(){
            // console.log('error');
            // console.log(this.activityIdErrorCode,'eeeee')
            //var str = this.formInline.activityId+'-此活动ID无效';
            //if(this.activityIdErrorCode == '4'){
                //str = this.formInline.activityId+'-此活动ID已存在 ';
            //}
            var str = this.formInline.activityId+'-'+this.ErrorMsg;
            this.activityIdErrorStatus = true;
            this.$refs.acitivityIdItem.error = str+' ';
            var me = this;
            setTimeout(function(){
                me.$refs.acitivityIdItem.error = str;
            },50);
        },
        getImgUrl: function(url){
            let imgUrl = util.getImgUrl(url);
            if(!url) {
                imgUrl = base.defaultImgUrl;
            }
            return imgUrl;
        },
        stringTrim: function(value){
            let tmp = util.stringTrim(value);
            if(tmp.length == 0){
                return value;
            }else{
                return Number(value);    
            }
        },
        showModalFun(){
            this.showModal = true;
        },
        //modal
        addItemBtn(){
            this.resetForm();
            this.curStatus = 'add';
            this.showItemOpt = true;
            var dailyForm = this.$els.dailyForm;
            this.resizeScrollbar('',dailyForm);
        },
        editItem(itemData){
            this.curItemData = itemData;
            this.curStatus = 'edit-'+itemData.activityId;
            this.showItemOpt = true;
            var dailyForm = this.$els.dailyForm;
            this.resizeScrollbar('',dailyForm);
        },
        deletItem(itemData){
            //ajax
            IndexService.deleteCustomActivity(itemData.id).then(data => {
                if(data.isSuccess){
                    this.moveScrollbar(0);
                    this.modalList.$remove(itemData);
                }
            });
        },
        submit () {
            if(this.activityIdErrorStatus){
                this.activityIdError();
                return;
            }
            this.$refs.formInline.validate((valid) => {
                if(!valid){
                    return;
                }
                //ajax
                let ajaxData = {
                    activityId: this.formInline.activityId,
                    //remark: urlencode(this.formInline.remark,'gbk'),
                    remark: this.formInline.remark,
                    seq: this.formInline.seq,
                }
                if(this.curStatus == 'add'){
                    IndexService.addCustomActivity(ajaxData).then(data => {
                        if(data.isSuccess){
                            this.modalList.push(data.data);
                            this.resetScrollbar();
                        }else {//参数非法
                        //    this.activityIdErrorCode = data.code;
                            this.ErrorMsg = data.message;
                            this.activityIdError();
                        }
                    });
                }else{
                    ajaxData.id = this.formInline.id;   //add data
                    IndexService.updateCustomActivity(ajaxData).then(data => {
                        if(data.isSuccess){
                            let curData = this.curItemData;
                            Object.assign(curData, data.data);
                            this.resetScrollbar();
                        }else {//参数非法
                //            this.activityIdErrorCode = data.code;
                            this.ErrorMsg = data.message;
                            this.activityIdError();
                        }
                    });
                }
            });
        },
        cancel () {
            this.resetScrollbar();
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
        resetForm: function(){
            this.$refs.formInline.resetFields();
            this.activityIdErrorStatus = false;
        }
    }
}
</script>