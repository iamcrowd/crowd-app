$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="tooltip"]').on("DOMNodeRemoved", function () {
    $('[data-toggle="tooltip"]').tooltip("hide");
  });
});

var uuidv4 = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

var getCSS = function (prop, fromClass) {
  var $inspector = $("<div>").css("display", "none").addClass(fromClass);
  $("body").append($inspector); // add to DOM, in order to read the CSS property
  try {
    return $inspector.css(prop);
  } finally {
    $inspector.remove(); // and remove from DOM
  }
};

var formatString = function (str) {
  return (str.charAt(0).toUpperCase() + str.slice(1))
    .split(/(?=[A-Z])/)
    .join(" ");
};

var formatSelector = function (str) {
  return str.replace("/", "-");
};

function toggleFullScreen(elem) {
  // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
  if (
    (document.fullScreenElement !== undefined &&
      document.fullScreenElement === null) ||
    (document.msFullscreenElement !== undefined &&
      document.msFullscreenElement === null) ||
    (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
    (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
  ) {
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
  var sBrowser,
    sUsrAg = navigator.userAgent;

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
  let doc = new PDFDocument({
    compress: false,
    size: [options.pageWidth || 612, options.pageHeight || 792],
    margin: 0,
  });
  SVGtoPDF(doc, svg, options.x || 0, options.y || 0, {
    width: options.width,
    height: options.height,
    assumePt: true,
  });
  let stream = doc.pipe(blobStream());
  stream.on("finish", () => {
    let blob = stream.toBlob("application/pdf");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = options.name + ".pdf";
    link.click();
  });
  doc.end();
}

function cropCanvas(sourceCanvas, left, top, width, height) {
  let destCanvas = document.createElement("canvas");
  destCanvas.width = width;
  destCanvas.height = height;
  destCanvas.getContext("2d").drawImage(
    sourceCanvas,
    left,
    top,
    width,
    height, // source rect with content to crop
    0,
    0,
    width,
    height
  ); // newCanvas, same size as source rect
  return destCanvas;
}

function isURI(str) {
  return URI(str).is("absolute");
}

function toURI(str) {
  // return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(' ', '');
  return str.split(" ").join("-").split("\n").join("-").toLowerCase();
}

// returns the fragment of the URI formatted as follows:
// 1) characters - are replaced by spaces (consecutive spaces are replaced by a single space)
// 2) the first letter of each word is capitalized the rest of the letters are lower case
// 3) if the fragment is in infix caps, a space is added between the lower case and upper case letters
// exists some special cases, which based on the path of the URI changed format:
// path | fragment | formatted fragment
// /negation | A | ¬A
// /union | A_B | A ∪ B
// /intersection | A_B | A ∩ B
// /exists | R_B | ∃R.B
// /exists | A_R_B | (A)∃R.B
// /exists/negation | A_R_B | (¬A)∃R.B
// /forall | R_B | ∀R.B
// /forall | A_R_B | (A)∀R.B
// /forall/negation | A_R_B | (¬A)∀R.B
// /dom | A | Dom A
// /ran | A | Ran A
// /dom/exists | R_B | Dom ∃R.B
// /dom/forall | R_B | Dom ∀R.B
function fromURI(str, defaultNamespace) {
  if (!str || !defaultNamespace) return "";
  let uri = URI(str);

  let namespace = namespaceFromURI(uri);

  // if the URI is a default URI, check for special cases
  if (operationFromURI(uri, defaultNamespace) != null) {
    let fragments = uri
      .fragment()
      .split("_")
      .map((fragment) => formatFragment(fragment));

    return crowdOperationsImpl[uri.path()]
      ? crowdOperationsImpl[uri.path()](fragments) ||
          formatFragment(uri.fragment())
      : formatFragment(uri.fragment());
  } else {
    return uri.fragment()?.length > 0
      ? formatFragment(uri.fragment())
      : uri.path() != "/"
      ? formatFragment(uri.path().split("/").slice(-1)[0])
      : uri.hostname()
      ? ''
      : str;
  }
}

// returns the fragment formatted as follows:
// 1) characters - are replaced by spaces (consecutive spaces are replaced by a single space)
// 2) the first letter of each word is capitalized the rest of the letters are lower case
// 3) if the fragment is in infix caps, a space is added between the lower case and upper case letters
function formatFragment(str) {
  return str
    .split(/[-_]/)
    .filter((word) => word.length > 0)
    .map(function (word) {
      // check if the word is in infix caps (e.g. infixCapsAndCops => Infix Caps And Cops)
      return word
        .split(/(?=[A-Z])/)
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
    })
    .join(" ");
}

function namespaceFromURI(uri) {
  if (uri.toString().length == 1) return uri.toString();
  if (uri.path().length > 1) {
    return uri.origin() + uri.path() + uri.query();
  } else {
    return uri.origin();
  }
}

// define all the operations that can be applied to the crowd URI
const crowdOperationsImpl = {
  "/negation": (fragments) => "¬" + fragments[0],
  "/union": (fragments) => fragments.join(" ⊔ "),
  "/intersection": (fragments) => fragments.join(" ⊓ "),
  "/dom": (fragments) => "Dom " + fragments[0],
  "/ran": (fragments) => "Ran " + fragments[0],
  "/exists": (fragments) => {
    if (fragments.length == 2) return "∃" + fragments[0] + "." + fragments[1];
    else if (fragments.length > 2)
      return "(" + fragments[0] + ")∃" + fragments[1] + "." + fragments[2];
    else return null;
  },
  "/forall": (fragments) => {
    if (fragments.length == 2) return "∀" + fragments[0] + "." + fragments[1];
    else if (fragments.length > 2)
      return "(" + fragments[0] + ")∀" + fragments[1] + "." + fragments[2];
    else return null;
  },
  "/dom/exists": (fragments) => {
    if (fragments.length > 1)
      return "Dom ∃" + fragments[0] + "." + fragments[1];
    else return null;
  },
  "/dom/forall": (fragments) => {
    if (fragments.length > 1)
      return "Dom ∀" + fragments[0] + "." + fragments[1];
    else return null;
  },
  "/negation/exists": (fragments) => {
    if (fragments.length == 2)
      return "∃" + fragments[0] + ".(¬" + fragments[1] + ")";
    else if (fragments.length > 2)
      return "(¬" + fragments[0] + ")∃" + fragments[1] + "." + fragments[2];
    else return null;
  },
  "/negation/forall": (fragments) => {
    if (fragments.length == 2)
      return "∀" + fragments[0] + ".(¬" + fragments[1] + ")";
    else if (fragments.length > 2)
      return "(¬" + fragments[0] + ")∀" + fragments[1] + "." + fragments[2];
    else return null;
  },
};

// define all the subpaths of the crowd URI, used for define fresh entities/relations from owl imports
const crowdOperations = [
  // "/faketop",
  "/union",
  "/intersection",
  "/exists",
  "/forall",
  // "/dom",
  // "/ran",
  "/dom/exists",
  "/dom/forall",
  "/negation",
  "/negation/exists",
  "/negation/forall",
];

function operationFromURI(uri, defaultNamespace) {
  let defaultURI = URI(defaultNamespace);
  if (uri.origin() == defaultURI.origin()) {
    if (crowdOperations.includes(uri.path())) {
      return uri.path();
    }
  }
  return null;
}

function capitalize(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

function capitalizeOnlyFirstLetter(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

function infixCapsReplace(str) {
  return str.replace(/([a-z])_?([A-Z])/g, "$1 $2");
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
  return str.split(" ").join("");
}

function escapeXML(xml) {
  return xml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatXML(xml) {
  var formatted = "";
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, "$1\r\n$2$3");
  var pad = 0;
  $.each(xml.split("\r\n"), function (index, node) {
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

    var padding = "";
    for (var i = 0; i < pad; i++) {
      padding += "  ";
    }

    formatted += padding + node + "\r\n";
    pad += indent;
  });

  return formatted;
}

function arraysEqual(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
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
            x:
              (mediumPosition.x +
                (element.getBBox().x + element.getBBox().width / 2)) /
              2,
            y:
              (mediumPosition.y +
                (element.getBBox().y + element.getBBox().height / 2)) /
              2,
          }
        : {
            x: element.getBBox().x + element.getBBox().width / 2,
            y: element.getBBox().y + element.getBBox().height / 2,
          };
    });

    mediumPosition = {
      x: mediumPosition.x - centerElement.getBBox().width / 2,
      y: mediumPosition.y - centerElement.getBBox().height / 2,
    };
  }

  return mediumPosition;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd("character", selectionEnd);
    range.moveStart("character", selectionStart);
    range.select();
  }
}

function setCaretToPos(input, pos) {
  setSelectionRange(input, pos, pos);
}
