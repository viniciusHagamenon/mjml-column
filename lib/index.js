'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _mjmlCore = require('mjml-core');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tagName = 'mj-column';
var parentTag = ['mj-section', 'mj-group', 'mj-navbar'];
var defaultMJMLDefinition = {
  attributes: {
    'background': null,
    'background-color': null,
    'border': null,
    'border-bottom': null,
    'border-left': null,
    'border-radius': null,
    'border-right': null,
    'border-top': null,
    'vertical-align': null,
    'width': null
  }
};
var baseStyles = {
  div: {
    verticalAlign: 'top'
  }
};
var postRender = function postRender($) {
  var mediaQueries = [];

  (0, _each2.default)({ 'mj-column-per': '%', 'mj-column-px': 'px' }, function (unit, className) {
    var columnWidths = [];

    $('[class*="' + className + '"]').each(function () {
      columnWidths.push($(this).data('column-width'));
      $(this).removeAttr('data-column-width');
    });

    (0, _uniq2.default)(columnWidths).forEach(function (width) {
      var _helpers$widthParser = _mjmlCore.helpers.widthParser(width, { parseFloatToInt: false }),
          parsedWidth = _helpers$widthParser.width;

      var mediaQueryClass = className + '-' + parseInt(parsedWidth);

      mediaQueries.push('.' + mediaQueryClass + ' { width:' + parsedWidth + unit + '!important; }');
    });
  });

  if (mediaQueries.length > 0) {
    var mediaQuery = '<style type="text/css">\n  @media only screen and (min-width:480px) {\n    ' + mediaQueries.join('\n') + '\n  }\n[owa] ' + mediaQueries.join('\n[owa] ') + '</style>\n';

    $('head').append(mediaQuery);
  }

  return $;
};

var Column = (0, _mjmlCore.MJMLElement)(_class = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Column);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Column.__proto__ || Object.getPrototypeOf(Column)).call.apply(_ref, [this].concat(args))), _this), _this.styles = _this.getStyles(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Column, [{
    key: 'getStyles',
    value: function getStyles() {
      var _props = this.props,
          mjAttribute = _props.mjAttribute,
          defaultUnit = _props.defaultUnit;


      return _mjmlCore.helpers.merge({}, baseStyles, {
        div: {
          display: 'inline-block',
          direction: 'ltr',
          fontSize: '13px',
          textAlign: 'left',
          verticalAlign: mjAttribute('vertical-align'),
          width: this.getMobileWidth()
        },
        table: {
          background: mjAttribute('background-color'),
          border: mjAttribute('border'),
          borderBottom: mjAttribute('border-bottom'),
          borderLeft: mjAttribute('border-left'),
          borderRadius: defaultUnit(mjAttribute('border-radius'), "px"),
          borderRight: mjAttribute('border-right'),
          borderTop: mjAttribute('border-top'),
          verticalAlign: mjAttribute('vertical-align')
        }
      });
    }
  }, {
    key: 'getColumnClass',
    value: function getColumnClass() {
      var _props2 = this.props,
          mjAttribute = _props2.mjAttribute,
          sibling = _props2.sibling;

      var width = mjAttribute('width');

      if (width == undefined) {
        return 'mj-column-per-' + parseInt(100 / sibling);
      }

      var _helpers$widthParser2 = _mjmlCore.helpers.widthParser(width),
          parsedWidth = _helpers$widthParser2.width,
          unit = _helpers$widthParser2.unit;

      switch (unit) {
        case '%':
          return 'mj-column-per-' + parsedWidth;

        case 'px':
        default:
          return 'mj-column-px-' + parsedWidth;
      }
    }
  }, {
    key: 'getMobileWidth',
    value: function getMobileWidth() {
      var _props3 = this.props,
          mjAttribute = _props3.mjAttribute,
          sibling = _props3.sibling,
          parentWidth = _props3.parentWidth,
          mobileWidth = _props3.mobileWidth;

      var width = mjAttribute('width');

      if (mobileWidth != "mobileWidth") {
        return '100%';
      } else if (width == undefined) {
        return parseInt(100 / sibling) + '%';
      }

      var _helpers$widthParser3 = _mjmlCore.helpers.widthParser(width),
          parsedWidth = _helpers$widthParser3.width,
          unit = _helpers$widthParser3.unit;

      switch (unit) {
        case '%':
          return width;
        case 'px':
        default:
          return parsedWidth / parentWidth + '%';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          mjAttribute = _props4.mjAttribute,
          children = _props4.children,
          sibling = _props4.sibling;

      var width = mjAttribute('width') || 100 / sibling + '%';
      var mjColumnClass = this.getColumnClass();
      var divClasses = (0, _classnames2.default)(mjColumnClass, 'outlook-group-fix', mjAttribute('css-class'));

      return _react2.default.createElement(
        'div',
        {
          className: divClasses,
          'data-class': mjAttribute('css-class'),
          'data-column-width': width,
          'data-vertical-align': this.styles.div.verticalAlign,
          style: this.styles.div },
        _react2.default.createElement(
          'table',
          {
            role: 'presentation',
            cellPadding: '0',
            cellSpacing: '0',
            'data-legacy-background': mjAttribute('background'),
            'data-legacy-border': '0',
            style: this.styles.table,
            width: '100%' },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.Children.map(children, function (child) {
              return _react2.default.cloneElement(child, { columnElement: true });
            })
          )
        )
      );
    }
  }]);

  return Column;
}(_react.Component)) || _class;

Column.defaultMJMLDefinition = defaultMJMLDefinition;
Column.tagName = tagName;
Column.parentTag = parentTag;
Column.baseStyles = baseStyles;
Column.postRender = postRender;

exports.default = Column;
