({
    init: function(cmp, event, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var propertyValue = myPageRef.state.c__propertyValue;
        cmp.set("v.propertyValue", propertyValue);
    }
})