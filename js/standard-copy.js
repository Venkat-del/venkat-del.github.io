/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

var Ejst = {};
Ejst.x2 = {};

/**
 * Hides tabs for initial loading.
 * @param {CQ.Ext.TabPanel} tabPanel The tab panel
 */

Ejst.x2.showInitialTabs = function(tabPanel) {
	tabPanel.hideTabStripItem(2);
	tabPanel.hideTabStripItem(3);
	tabPanel.hideTabStripItem(4);
	tabPanel.hideTabStripItem(5);
    tabPanel.doLayout();
};


/**
 * Manages the tabs of the specified tab panel. The tab with
 * the specified ID will be shown, the others are hidden.
 * @param {CQ.Ext.TabPanel} tabPanel The tab panel
 * @param {String} tab the ID of the tab to show
 */
Ejst.x2.manageTabs = function(tabPanel, tab) {
	
    var tabs=['tab1','tab2','tab3','tab4', 'tab5','tab6'];
    var index = tab ? tabs.indexOf(tab) : -1;
//    if (index == -1) return;
    for (var i = 2; i != tabs.length; i++) {
        if (index == i) {
            tabPanel.unhideTabStripItem(i);
            
        } else {
            tabPanel.hideTabStripItem(i);
        }
    }
    //tab3 should be a image tab.
    if(tab == 'tab3'){
    	tabPanel.unhideTabStripItem(5);
	}
    tabPanel.doLayout();
};

/**
 * Hides the specified tab.
 * @param {CQ.Ext.Panel} tab The panel
 */
Ejst.x2.hideTab = function(tab) {
    var tabPanel = tab.findParentByType('tabpanel');
    var index = tabPanel.items.indexOf(tab);
    tabPanel.hideTabStripItem(index);
};

/**
 * Shows the tab which ID matches the value of the specified field.
 * @param {CQ.Ext.form.Field} field The field
 */
Ejst.x2.showTab = function(field) {
    Ejst.x2.manageTabs(field.findParentByType('tabpanel'), field.getValue());
};

