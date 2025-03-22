import { StreamParser } from "@codemirror/language";

interface State {
  stack: string[];
}

export const jqParser: StreamParser<State> = {
  name: "jq",
  languageData: {},
  
  startState: () => ({ stack: ["start"] }),
  
  token: (stream, state) => {
    if (stream.eatSpace()) return null;
    
    const currentState = state.stack[state.stack.length - 1];
    
    if (currentState === "start" || currentState === "expression") {
      if (stream.match(/\./)) return "tag";
      if (stream.match(/\w+|==|!=|\|/)) return "builtin";
      if (stream.match(/\(/)) { state.stack.push("expression"); return "variable-2"; }
      if (stream.match(/\)/)) { state.stack.pop(); return "variable-2"; }
      if (stream.match(/{/)) { state.stack.push("object"); return "bracket"; }
      if (stream.match(/\[/)) { state.stack.push("array"); return "bracket"; }
    }
    
    if (currentState === "object") {
      if (stream.match(/}/)) { state.stack.pop(); return "bracket"; }
      if (stream.match(/,/)) return "bracket";
      if (stream.match(/[a-z]\w*/i)) return "keyword";
      if (stream.match(/:/)) { state.stack.push("value"); return "bracket"; }
      if (stream.match(/"/)) { state.stack.push("string"); return "string"; }
      if (stream.match(/\(/)) { state.stack.push("expression"); return "variable-2"; }
    }
    
    if (currentState === "array") {
      if (stream.match(/]/)) { state.stack.pop(); return "bracket"; }
      if (stream.match(/,/)) return "bracket";
      state.stack.push("value");
    }
    
    if (currentState === "value") {
      if (stream.match(/null|true|false/)) return "atom";
      if (stream.match(/\d+/)) return "number";
      if (stream.match(/\./)) return "tag";
      if (stream.match(/\(/)) { state.stack.push("expression"); return "variable-2"; }
      if (stream.match(/"/)) { state.stack.push("string"); return "string"; }
      if (stream.match(/{/)) { state.stack.push("object"); return "bracket"; }
      if (stream.match(/\[/)) { state.stack.push("array"); return "bracket"; }
      if (stream.match(/[,}\]]/)) { state.stack.pop(); return "bracket"; }
    }
    
    if (currentState === "string") {
      if (stream.match(/[^"\\]+/)) return "string";
      if (stream.match(/\\\(/)) { state.stack.push("expression"); return "variable-2"; }
      if (stream.match(/"/)) { state.stack.pop(); return "string"; }
    }
    
    stream.next();
    return null;
  }
};

