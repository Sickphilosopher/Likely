/**
 * Vkontakte service provider
 */

var config = require('../config'),
    utils  = require('../utils')
    dom    = require('../dom');

var vkontakte = {
    counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
    counter: function (url, promise) {
        var vk = vkontakte;
        
        vk._.push(promise);
        
        dom.getScript(utils.makeUrl(url, {index: vk._.length - 1}));
    },
    _: [],
    popupUrl: config.protocol + "//vk.com/share.php?url={url}&title={title}",
    popupWidth: 550,
    popupHeight: 330
};

utils.set(window, 'VK.Share.count', function (index, count) {
    vkontakte._[index](count);
});

module.exports = vkontakte;
