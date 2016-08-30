var unlock = {

    init: function () {

        if (!document.querySelectorAll(".obfuscated-content").length) return

        this.deobfuscateText()

        browser.runtime.sendMessage({
            title: "unlock-spiegel-online-plus",
            content: "Plus Artikel wurde freigeschaltet!"
        });
    },

    deobfuscateText: function () {

        var me = this

        ;[].forEach.call(document.querySelectorAll('.obfuscated'), function (el) {
            el.classList.remove('obfuscated')
            el.classList.add('deobfuscated', 'text-link-int', 'spCelink')

            me.replaceTextContent(el)
        })

        ;[].forEach.call(document.querySelectorAll('.obfuscated-content'), function (el) {

            el.classList.remove('obfuscated-content')
            el.classList.add('deobfuscated-content')

            var parent = el.parentNode
            parent.style.setProperty('filter', 'blur(0px)', 'important');
            parent.style.setProperty('opacity', '1', 'important');

            parent.parentNode.removeChild(parent.nextSibling)
        })
    },

    replaceTextContent: function (elem) {

        var me = this

        ;[].forEach.call(elem.childNodes, function (node) {

            var dechiffre = {
                177: '&',
                178: '!',
                180: ';',
                181: '=',
                32: ' '
            }

            var abc = [
                'text-link-int',
                'text-link-ext',
                'lp-text-link-int',
                'lp-text-link-ext',
                'spCelink'
            ]

            if (typeof(node) !== 'object' &&
                node.nodeType !== 3 &&
                node.nodeType !== 1) {
                return
            }

            if (node.nodeType === 1 &&
                node.classList !== undefined &&
                new RegExp(abc.join("|")).test(node.classList.toString()))
                return

            var obfuscatedText = node.textContent;
            var deobfuscatedText = "";

            for (var i = 0; i < obfuscatedText.length; i++) {

                var charValue = obfuscatedText.charCodeAt(i)

                if (dechiffre[charValue] !== undefined) {
                    deobfuscatedText += dechiffre[charValue]
                    continue;
                }

                if (charValue > 33) {
                    deobfuscatedText += String.fromCharCode(charValue - 1)
                }
            }

            node.textContent = deobfuscatedText
        })
    }
}

unlock.init();
