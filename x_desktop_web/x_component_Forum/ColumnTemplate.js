/**
 * Created by CXY on 2017/4/26.
 */
MWF.xApplication.Forum.ColumnTemplate = new Class({
    Extends: MWF.widget.Common,
    Implements: [Options, Events],
    options: {
        "style": "default",
        "width": "1230",
        "type": "type_1_0",
        "categoryId" : ""
    },
    initialize : function( container, app, explorer, options ){
        this.setOptions(options);
        this.container = container;
        this.app = app;
        this.lp = app.lp;
        this.actions = app.restActions;
        this.explorer = explorer;

        this.path = "/x_component_Forum/$ColumnTemplate/";

        this.cssPath = "/x_component_Forum/$ColumnTemplate/" + this.options.style + "/css.wcss";
        this._loadCss();
    },
    load: function(){
        this.loadSetting();
        this.loadView();
    },
    _loadSetting: function(){
        var path = "/x_component_Forum/$ColumnTemplate/template/setting.json";
        var templateSetting;
        if (MWF.xApplication.Forum.ColumnTemplate.Setting){
            templateSetting = MWF.xApplication.Forum.ColumnTemplate.Setting;
        }else{
            var r = new Request.JSON({
                url: path,
                secure: false,
                async: false,
                method: "get",
                noCache: false,
                onSuccess: function(responseJSON, responseText){
                    templateSetting = MWF.xApplication.Forum.ColumnTemplate.Setting = responseJSON;
                }.bind(this),
                onError: function(text, error){
                    alert(error + text);
                }
            });
            r.send();
        }
        return templateSetting;
    },
    loadSetting: function(){
        var setting = this._loadSetting();
        this.setting = setting[this.options.type];
    },
    loadView: function(){
        this.view = new MWF.xApplication.Forum.ColumnTemplate.View(this.container, this.app, this, {
            setting : this.setting,
            templateUrl: this.setting.template,
            categoryId: this.options.categoryId
        }, {
            css: this.css
        });
        this.view.load();
    }
});

MWF.xApplication.Forum.ColumnTemplate.View = new Class({
    Extends: MWF.xApplication.Template.Explorer.ComplexView,
    _createDocument: function (data, index) {
        if( this.app.access.isSectionViewer( data ) ){
            return new MWF.xApplication.Forum.ColumnTemplate.Document(this.viewNode, data, this.explorer, this, null, index);
        }
    },

    _getCurrentPageData: function (callback, count) {
        if (!count)count = 20;
        var id = (this.items.length) ? this.items[this.items.length - 1].data.id : "(0)";
        var filter = this.filterData || {};
        this.actions.listSection(this.options.categoryId, function (json) {
            if( !json.data )json.data = [];
            if (callback)callback(json);
        }.bind(this))
    },
    _removeDocument: function (documentData, all) {
        //this.actions.deleteSchedule(documentData.id, function(json){
        //    this.reload();
        //    this.app.notice(this.app.lp.deleteDocumentOK, "success");
        //}.bind(this));
    },
    _create: function () {

    },
    _openDocument: function (documentData) {
    },
    _queryCreateViewNode: function () {

    },
    _postCreateViewNode: function (viewNode) {
    },
    _queryCreateViewHead: function () {

    },
    _postCreateViewHead: function (headNode) {

    }

});

MWF.xApplication.Forum.ColumnTemplate.Document = new Class({
    Extends: MWF.xApplication.Template.Explorer.ComplexDocument,
    mouseoverDocument: function () {
        //this.node.getElements("[styles='itemTitleNode']").setStyles(this.css["itemTitleNode_over"]);
        //this.node.getElements("[styles='itemIconNode']").setStyles(this.css["itemIconNode_over"]);
        //this.node.getElements("[styles='itemStatNode']").setStyles(this.css["itemStatNode_over"]);
    },
    mouseoutDocument: function () {
        //this.node.getElements("[styles='itemTitleNode']").setStyles(this.css["itemTitleNode"]);
        //this.node.getElements("[styles='itemIconNode']").setStyles(this.css["itemIconNode"]);
        //this.node.getElements("[styles='itemStatNode']").setStyles(this.css["itemStatNode"]);
    },
    _queryCreateDocumentNode: function (itemData) {
    },
    _postCreateDocumentNode: function (itemNode, itemData) {
        var personNode = itemNode.getElements("[item='moderatorNames']")[0];
        if(personNode)this.createPersonNode( personNode, itemData.moderatorNames );

        var _self = this;
        var setting = this.view.options.setting;
        var columnCount = setting.column;
        if( (this.index + 1) % columnCount == 0 ){
            itemNode.setStyle("margin-right" , "0px" );
        }
        if( setting.hasBorder ){
            this.container.setStyle("padding-bottom", "10px");
        }

        if( setting.image ){
            this._loadImage( itemNode );
        }

        this._loadSubjectList( itemNode );


    },
    _loadSubjectList: function( itemNode ){
        var listNode = itemNode.getElements("[item='itemListNode']")[0];
        var replyListNode = itemNode.getElements("[item='itemReplyListNode']")[0];
        if (listNode) {
            this._getListData(function (json) {
                json.data.each(function (d,i) {
                    var div = new Element("div", {
                        "styles": this.css.itemListItemNode,
                        "text": d.title,
                        "title": d.title
                    }).inject(listNode);
                    div.addEvents({
                        "mouseover": function () {
                            this.node.setStyles(this.obj.css.itemListItemNode_over)
                        }.bind({node: div, obj: this}),
                        "mouseout": function () {
                            this.node.setStyles(this.obj.css.itemListItemNode)
                        }.bind({node: div, obj: this}),
                        "click" : function(){
                            var appId = "ForumDocument"+this.da.id;
                            if (this.obj.app.desktop.apps[appId]){
                                this.obj.app.desktop.apps[appId].setCurrent();
                            }else {
                                this.obj.app.desktop.openApplication(null, "ForumDocument", {
                                    "sectionId" : this.da.sectionId,
                                    "id" : this.da.id,
                                    "appId": appId,
                                    "isEdited" : false,
                                    "isNew" : false,
                                    "index" : i
                                });
                            }
                        }.bind({da: d, obj: this})
                    })

                    if(replyListNode){
                        var replyNode = new Element("div", {
                            "styles": this.css.itemReplyListItemNode
                        }).inject(replyListNode);

                        var div = new Element("div", {
                            "styles": this.css.itemReplyPersonNode,
                            "text": d.creatorName
                        }).inject(replyNode);
                        div.addEvents({
                            "mouseover": function () {
                                this.node.setStyles(this.obj.css.itemReplyPersonNode_over)
                            }.bind({node: div, obj: this}),
                            "mouseout": function () {
                                this.node.setStyles(this.obj.css.itemReplyPersonNode)
                            }.bind({node: div, obj: this}),
                            "click" : function(){
                                this.obj.app.openPerson( this.userName );
                            }.bind( {userName : d.creatorName, obj:this} )
                        })

                        var div = new Element("div", {
                            "styles": this.css.itemReplyTimeNode,
                            "text": this.getDateDiff(d.createTime),
                            "title": d.createTime
                        }).inject(replyNode);
                    }

                }.bind(this))
            }.bind(this), this.view.options.setting.itemCount)
        }
    },
    _loadImage: function( itemNode ){
        var _self = this;
        var imageNode = itemNode.getElements("[item='itemImage']")[0];
        var filterData = {
            "sectionId": this.data.id,
            "needPicture" : true
        };
        if(imageNode){
            this.actions.listSubjectFilterPage(1, 1,  filterData, function( json ){
                if( json.data ){
                    var d = json.data[0];
                    this.node.set("title", d.title);
                    if(d.picId){
                        this.node.set("src", MWF.xDesktop.getImageSrc(d.picId) );
                        this.node.setStyle("cursor", "pointer");
                    }
                    this.node.addEvents({
                        "click": function () {
                            var appId = "ForumDocument" + this.da.id;
                            if (_self.app.desktop.apps[appId]) {
                                _self.app.desktop.apps[appId].setCurrent();
                            } else {
                                _self.app.desktop.openApplication(null, "ForumDocument", {
                                    "sectionId": this.da.sectionId,
                                    "id": this.da.id,
                                    "appId": appId,
                                    "isEdited": false,
                                    "isNew": false
                                });
                            }
                        }.bind({da: d})
                    })
                }
            }.bind({ node : imageNode }))
        }
    },
    _getListData: function (callback, count) {
        if (!count)count = 6;
        var filterData = {
            "sectionId": this.data.id
        };
        this.actions.listSubjectFilterPage(1, count, filterData, function (json) {
            if (!json.data)json.data = [];
            if (callback)callback(json);
        }.bind(this))
    },
    removeCenterWork: function (itemData) {
        //if(isAdmin){
        //    return true;
        //}
        return false;
    },
    openSection : function( el ){
        var appId = "ForumSection"+ this.data.id;
        if (this.app.desktop.apps[appId]){
            this.app.desktop.apps[appId].setCurrent();
        }else {
            this.app.desktop.openApplication(el, "ForumSection", {
                "sectionId": this.data.id,
                "appId": appId
            });
        }
    },
    openPerson : function( userName ){
        var appId = "ForumPerson"+userName;
        if (this.desktop.apps[appId]){
            this.desktop.apps[appId].setCurrent();
        }else {
            this.desktop.openApplication(null, "ForumPerson", {
                "personName" : userName,
                "appId": appId
            });
        }
    },
    createPersonNode : function( container, personName ){
        var persons = personName.split(",");
        persons.each( function(userName, i){
            var span = new Element("span", {
                "text" : userName,
                "styles" : this.css.person
            }).inject(container);
            span.addEvents( {
                mouseover : function(){ this.node.setStyles( this.obj.css.person_over )}.bind( {node:span, obj:this} ),
                mouseout : function(){ this.node.setStyles( this.obj.css.person )}.bind( {node:span, obj:this} ),
                click : function(){ this.obj.openPerson( this.userName ) }.bind( {userName:userName, obj:this} )
            });
            if( i != persons.length - 1 ){
                new Element("span", {
                    "text" : "、"
                }).inject(container);
            }
        }.bind(this))
    },
    getDateDiff : function (publishTime) {
        var dateTimeStamp = Date.parse(publishTime.replace(/-/gi, "/"));
        var minute = 1000 * 60;
        var hour = minute * 60
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year = month * 12;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            //若日期不符则弹出窗口告之
            //alert("结束日期不能小于开始日期！");
        }
        var yesterday = new Date().decrement('day', 1);
        var beforYesterday = new Date().decrement('day', 2);
        var yearC = diffValue / year;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (yesterday.getFullYear() == dateTimeStamp.getFullYear() && yesterday.getMonth() == dateTimeStamp.getMonth() && yesterday.getDate() == dateTimeStamp.getDate()) {
            result = "昨天 " + dateTimeStamp.getHours() + ":" + dateTimeStamp.getMinutes();
        } else if (beforYesterday.getFullYear() == dateTimeStamp.getFullYear() && beforYesterday.getMonth() == dateTimeStamp.getMonth() && beforYesterday.getDate() == dateTimeStamp.getDate()) {
            result = "前天 " + dateTimeStamp.getHours() + ":" + dateTimeStamp.getMinutes();
        } else if (yearC > 1) {
            result = dateTimeStamp.getFullYear() + "年" + (dateTimeStamp.getMonth() + 1) + "月" + dateTimeStamp.getDate() + "日";
        } else if (monthC >= 1) {
            //result= parseInt(monthC) + "个月前";
            // s.getFullYear()+"年";
            result = (dateTimeStamp.getMonth() + 1) + "月" + dateTimeStamp.getDate() + "日";
        } else if (weekC >= 1) {
            result = parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            result = parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            result = parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            result = parseInt(minC) + "分钟前";
        } else
            result = "刚刚发表";
        return result;
    }
});