import Prism from 'prismjs';

Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*?(\r?\n|$)/g, lookbehind: !0 },
  string: /("|')(\\?.)*?\1/g,
  keyword:
    /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
  boolean: /\b(True|False)\b/g,
  number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
  operator:
    /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};

Prism.languages.ruby = {
  comment: /#[^\r\n]*(\r?\n|$)/g,
  string: /("|')(\\?.)*?\1/g,
  regex: {
    pattern:
      /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  },
  keyword:
    /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
  builtin:
    /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
  boolean: /\b(true|false)\b/g,
  number: /\b-?(0x)?\d*\.?\d+\b/g,
  operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
  'inst-var': /[@&]\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  namespace: /::\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  const: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};

Prism.languages.java = Prism.languages.extend('clike', {
  keyword:
    /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  number:
    /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
  operator: {
    pattern:
      /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: true
  }
});

Prism.languages.insertBefore('java', 'function', {
  annotation: {
    alias: 'punctuation',
    pattern: /(^|[^.])@\w+/,
    lookbehind: true
  }
});

Prism.languages.insertBefore('java', 'class-name', {
  generics: {
    pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
    alias: 'function',
    inside: {
      keyword: Prism.languages.java.keyword,
      punctuation: /[<>(),.:]/
    }
  }
});

Prism.languages.csharp = Prism.languages.extend('clike', {
  keyword:
    /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
  string: [
    {
      pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true
    },
    {
      pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
      greedy: true
    }
  ],
  'class-name': [
    {
      // (Foo bar, Bar baz)
      pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
      inside: {
        punctuation: /\./
      }
    },
    {
      // [Foo]
      pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    {
      // class Foo : Bar
      pattern:
        /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    {
      // class Foo
      pattern:
        /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    }
  ],
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i
});

Prism.languages.insertBefore('csharp', 'class-name', {
  'generic-method': {
    pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
    inside: {
      function: /^\w+/,
      'class-name': {
        pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
        inside: {
          punctuation: /\./
        }
      },
      keyword: Prism.languages.csharp.keyword,
      punctuation: /[<>(),.:]/
    }
  },
  preprocessor: {
    pattern: /(^\s*)#.*/m,
    lookbehind: true,
    alias: 'property',
    inside: {
      // highlight preprocessor directives as keywords
      directive: {
        pattern:
          /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
        lookbehind: true,
        alias: 'keyword'
      }
    }
  }
});

Prism.languages.dotnet = Prism.languages.csharp;
