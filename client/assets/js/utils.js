$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="tooltip"]').on("DOMNodeRemoved", function () {
    $('[data-toggle="tooltip"]').tooltip('hide');
  });
});

var uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var getCSS = function (prop, fromClass) {
  var $inspector = $("<div>").css('display', 'none').addClass(fromClass);
  $("body").append($inspector); // add to DOM, in order to read the CSS property
  try {
    return $inspector.css(prop);
  } finally {
    $inspector.remove(); // and remove from DOM
  }
};

var formatString = function (str) {
  return (str.charAt(0).toUpperCase() + str.slice(1)).split(/(?=[A-Z])/).join(" ");
}

var formatSelector = function (str) {
  return str.replace('/', '-');
}

function toggleFullScreen(elem) {
  // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function getEventClientPoint(event) {
  if (getBrowser() == "Mozilla Firefox") {
    return { x: event.originalEvent.layerX, y: event.originalEvent.layerY };
  } else {
    return { x: event.originalEvent.offsetX, y: event.originalEvent.offsetY };
  }
}

function getBrowser() {
  var sBrowser, sUsrAg = navigator.userAgent;

  // The order matters here, and this may report false positives for unlisted browsers.

  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = "unknown";
  }
  return sBrowser;
}

function SVGtoPDFDownload(svg, options) {
  let doc = new PDFDocument({ compress: false, size: [options.pageWidth || 612, options.pageHeight || 792], margin: 0 });
  SVGtoPDF(doc, svg, options.x || 0, options.y || 0, { width: options.width, height: options.height, assumePt: true });
  let stream = doc.pipe(blobStream());
  stream.on('finish', () => {
    let blob = stream.toBlob('application/pdf');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = options.name + ".pdf";
    link.click();
  });
  doc.end();
}

function cropCanvas(sourceCanvas, left, top, width, height) {
  let destCanvas = document.createElement('canvas');
  destCanvas.width = width;
  destCanvas.height = height;
  destCanvas.getContext("2d").drawImage(
    sourceCanvas,
    left, top, width, height,  // source rect with content to crop
    0, 0, width, height);      // newCanvas, same size as source rect
  return destCanvas;
}

function isURI(str) {
  return str.indexOf('http://') == 0;
}

function toURI(str) {
  // return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(' ', '');
  return str.split(' ').join('-').split('\n').join('-').toLowerCase();
}

function fromURI(str) {
  if (str != null && str.indexOf("IMPORT") != -1) {
    try {
      return fromURIImport(getURIFragment(str), getImportSymbol(str))
    } catch (e) {
      return _fromURI(str);
    }
  } else if (str != null && str.indexOf("NORMAL\/FRESH") != -1) {
    try {
      return fromURIFresh(getURIFragment(str).substring(1, str.length - 1))
    } catch (e) {
      return _fromURI(str);
    }
  } else {
    return _fromURI(str);
  }
}

function _fromURI(str) {
  return str != null ? infixCapsReplace(capitalizeOnlyFirstLetter(getURIFragment(str).split('-').join(' '))) : str;
}

function getImportSymbol(str) {
  var start = str.indexOf("IMPORT\/") + "IMPORT\/".length;
  var end = str.indexOf("%");
  if (start == -1 || end == -1) return { symbol: '-', infix: true };
  var operation = fromURI(str.substring(start, end));
  switch (operation) {
    case 'UNION': return { symbol: '∪', infix: true }; break;
    case 'INTERSECTION': return { symbol: '∩', infix: true }; break;
    case 'COMPLEMENT': return { symbol: "'", infix: false }; break;
    default: return { symbol: '<' + operation + '>', infix: true }; break;
  }
}

function fromURIImport(str, op) {
  if (str.indexOf("%") != -1) return op.infix ? op.symbol + '(' + fromURI(str) + ')' : '(' + fromURI(str) + ')' + op.symbol;
  var uris = str.split('$').map(uri => fromURI(uri)).filter(uri => uri != '');
  if (uris.length <= 1) return op.symbol + ' ' + uris[0];
  else return uris.join(' ' + op.symbol + ' ');
}

function fromURIFresh(str) {
  // console.log("TERM", str);
  if (isURI(str.substring(1, str.length - 1))) {
    return fromURI(str.substring(1, str.length - 1));
  } else {
    var start = str.indexOf("(");
    var end = str.lastIndexOf(")");
    var symbol = str.substring(0, start);
    // console.log("SYMBOL", symbol);
    var elements = str.substring(start + 1, end).split(' ');
    elements = combineElements(elements);
    // console.log("ELEMENTS", elements);
    var beutySymbol;
    var infix = true;
    switch (symbol) {
      case 'ObjectIntersectionOf':
        beutySymbol = '∩';
        break;
      case 'ObjectUnionOf':
        beutySymbol = '∪';
        break;
      case 'ObjectSomeValuesFrom':
        beutySymbol = '∃';
        infix = false;
        break;
      case 'ObjectAllValuesFrom':
        beutySymbol = '∀';
        infix = false;
        break;
    }
    elements = elements.map(function (element) { return fromURIFresh(element) });

    return infix ? elements.join(' ' + beutySymbol + ' ') : beutySymbol + ' ' + elements[0] + '.(' + elements[1] + ')';
  }
}

function combineElements(elements) {
  var terms = [];
  var openTerm = false;
  elements.forEach(function (element) {
    if (!openTerm) terms.push(element)
    else terms[terms.length - 1] += ' ' + element
    if (hasSymbol(element)) openTerm = true;
    if (element.indexOf(')') != -1) openTerm = false;
  });
  return terms;
}

function hasSymbol(str) {
  return str.indexOf("ObjectIntersectionOf") != -1 ||
    str.indexOf("ObjectSomeValuesFrom") != -1 ||
    str.indexOf("ObjectUnionOf") != -1 ||
    str.indexOf("ObjectAllValuesFrom") != -1;
}

function capitalize(str) {
  return str.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

function capitalizeOnlyFirstLetter(str) {
  return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

function infixCapsReplace(str) {
  return str.replace(/([a-z])_?([A-Z])/g, '$1 $2');
}

function toInfixCaps(str) {
  return lowerFirstLetter(removeSpaces(str));
}

function lowerFirstLetter(str) {
  return str != null ? str.charAt(0).toLowerCase() + str.slice(1) : str;
}

function upperFirstLetter(str) {
  return str != null ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

function removeSpaces(str) {
  return str.split(' ').join('');
}

function getURIFragment(uri) {
  var separator = '/';
  if (uri.indexOf('%') != -1) separator = '%';
  else if (uri.indexOf('#') != -1) separator = '#';
  var fragment;
  if (separator == '/') {
    fragment = uri.split(separator);
    fragment = fragment[fragment.length - 1];
  } else {
    fragment = uri.substring(uri.indexOf(separator) + 1, uri.length);
  }
  return fragment;
}

function getURINamespace(uri) {
  var separator = '/';
  if (uri.indexOf('%') != -1) separator = '%';
  else if (uri.indexOf('#') != -1) separator = '#';
  var namespace;
  if (separator == '/') {
    namespace = uri.substring(0, uri.lastIndexOf(separator) + 1);
  } else {
    namespace = uri.substring(0, uri.indexOf(separator) + 1);
  }
  return namespace;
}

function escapeXML(xml) {
  return xml.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatXML(xml) {
  var formatted = '';
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  var pad = 0;
  $.each(xml.split('\r\n'), function (index, node) {
    var indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad != 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    var padding = '';
    for (var i = 0; i < pad; i++) {
      padding += '  ';
    }

    formatted += padding + node + '\r\n';
    pad += indent;
  });

  return formatted;
}

function arraysEqual(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1)
    || !Array.isArray(_arr2)
    || _arr1.length !== _arr2.length
  ) {
    return false;
  }

  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function medianPoint(centerElement, aroundElements) {
  // console.log('medianPoint', centerElement, aroundElements)
  var mediumPosition = null;

  if (centerElement && aroundElements.length) {
    aroundElements.forEach(function (element) {
      mediumPosition = mediumPosition
        ? {
          x: ((mediumPosition.x + (element.getBBox().x + element.getBBox().width / 2)) / 2),
          y: ((mediumPosition.y + (element.getBBox().y + element.getBBox().height / 2)) / 2),
        }
        : {
          x: (element.getBBox().x + element.getBBox().width / 2),
          y: (element.getBBox().y + element.getBBox().height / 2),
        };
    });

    mediumPosition = {
      x: mediumPosition.x - centerElement.getBBox().width / 2,
      y: mediumPosition.y - centerElement.getBBox().height / 2
    }
  }

  return mediumPosition;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}
