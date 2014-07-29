ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {

    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        }, {
            token : "comment.doc.tag",
            regex : "\\bTODO\\b"
        }, {
            defaultToken : "comment.doc"
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};

exports.DocCommentHighlightRules = DocCommentHighlightRules;

});


ace.define("ace/mode/pql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PqlHighlightRules = function() {
   
    var keywordMapper = this.createKeywordMapper({
       "variable.language":
            "$param|$error|",
        "keyword":
            "break|case|foreach|while|next|" +
            "if|then|else|endif|in|return|switch|dim|like|and|or|match",
        "keyword.other":
            "$CaseInsensitive|$CaseInsensitiveComparison|$CaseInsensitiveFunctions|$CaseInsensitiveGrouping|"+
            "$CaseInsensitiveOrdering|$CaseSensitive|$CaseSensitiveComparison|$CaseSensitiveFunctions|"+
            "$CaseSensitiveGrouping|$CaseSensitiveOrdering|$CompareCount|$CompareState|$Concurrent|"+
            "$ConcurrentIndex|$Confidence|$Connected|$ConnectToObject|$CurrentAccount|$CurrentJobGUID|"+
            "$CurrentJobInitiator|$CurrentLanguage|$EnvironmentVariables|$FuzzyLogic|$IgnoreError|$IgnoreMissing|"+
            "$IgnoreOffline|$KeyValueStorePhysicalGUID|$LastJobGUID|$LinePar|$LocalOnly|$LockedForEdit|$MatchAll|"+
            "$MaxIdAttrDef|$MaxIdChildDef|$MaxIdMethDef|$MaxIdParentDef|$MaxIdStateDef|$ModificationCount|$Modified|"+
            "$ModifiedOnNodes|$NoImplicitNavigation|$NonRepeatableRead|$NoProxy|$NoTranslation|$OnlyVisible|"+
            "$Parallel|$PoliciesBeforeMoveToRecycleBin|$PqlHeader|$PrintNotOnProduction|$PrintOff|$PrintOn|"+
            "$PrintOnlyOnDC|$Proxy|$ProxyCached|$ProxySynchronized|$Transaction|$Translation|"+
            "$UnVersioned|$Versioned",
        "support.class":
            "$__reserved",
        "support.class.method.internal":
            "BinaryExport|BinaryImport|CheckConnectionUsed|CheckConsistency|ConnectToDesktop|DeleteObject|"+
            "DeleteReference|DeleteTree|DesktopMinimize|EmptyRecycleBinAll|EmptyRecycleBinAllInvisble|GetTime|"+
            "GetTimeUTC|Instantiate|InstantiateExtended|InstantiateSet|InstantiateSetTransient|InstantiateTemplate|"+
            "InstantiateTransient|MoveObjectArray|MoveReference|MoveReferenceBefore|NewReference|NewVersionDirect|"+
            "PolicyAdd|PolicyDelete|PolicySet|ProjectDelete|ProjectInsert|ProjectNewDerivedClass|"+
            "ProjectNewDuplicateTemplate|ProjectNewDuplicateTemplateTree|ProjectNewTemplate|ProjectNewTemplate|"+
            "ProjectNewVersion|ProjectNewVersionOfSelected|ProjectSetDeploymentStateDevelopment|SetApplicationFocus|"+
            "SetIcon|SetVersionDate|StartNAgent|StorageStateSetPermanent|StorageStateSetReadOnly|"+
            "StorageStateSetReadWrite|UnlinkFromAllParentsAndDeleteTree|XDODirect",
        "support.class.attribute.properties":       
            "$AttrId|$AttrNameIntern|$AttrNameInternLC|$AttrNameVisible|$CalculateDefaultValue|"+
            "$ClassToReference|$Constraints|$ContainsExpression|$DefaultValue|$DeletePrivilegeBitmap|"+
            "$DeletePrivileges|$Description|$DisplayValue|$Docu|$Editable|$EditConstraints|$EditMode|"+
            "$EditPrivilegeBitmap|$EditPrivileges|$EditProperty|$Format|$Indexed_NotUsed|$LineId_NotUsed|"+
            "$MovePrivilegeBitmap|$MovePrivileges|$Multiple|$NewPrivilegeBitmap|$NewPrivileges|$PassMoveObject|"+
            "$PassVersionDate|$ProgTypeProperties|$Range|$SearchAttributes|$SearchMethods|$SearchQuickLaunch|"+
            "$SortIndex|$Substitutions|$SubstitutionsCount|$TranslateContent|$Transparent_NotUsed|$Type|"+
            "$TypeProperty|$VersionContext|$Viewable|$ViewConstraints|$ViewPrivilegeBitmap|$ViewPrivileges|"+
            "$VirtualReference|$VisibleForEdit",
        "support.class.method.properties":
            "$ConnectToObject|$DefaultMethod|$Description|$DisabledIfLockedForEdit|$Docu|$DontInherit|$Icon|"+
            "$ImplementationName|$ImplementationNameLC|$ImplementedBy|$LineId_NotUsed|$LinePar|$LocalOnly|"+
            "$MethId|$MethNameIntern|$MethNameInternLC|$MethNameVisible|$Param|$ParamCount|$ParamDef|"+
            "$PostConstraints|$PreConstraints|$PrgName|$PrivilegeBitmap|$Privileges|$QuickLaunch|$ReturnType|"+
            "$Type|$ValidForAgent|$ValidForClass|$ValidForInstance|$ValidForState|$ValidForTemplate|"+
            "$VersionContext|$VisibleInPopUp|$VisibleInToolBox|$WindowMode|$WrkDir",
        "support.class.reference.properties":
            "$__reserved|$ClassToReference|$DeletePrivilegeBitmap|$DeletePrivileges|$Description|$Docu|"+
            "$LineId_NotUsed|$MovePrivilegeBitmap|$MovePrivileges|$Multiple|$NewPrivilegeBiemap|$NewPrivileges|"+
            "$PassMoveObject|$PassVersionDate|$RefId|$RefNameIntern|$RefNameInternLC|$RefNameVisible|"+
            "$SearchAttributes|$SearcheMethods|$SearchQuickLaunch|$SortIndex|$VersionContext|$VirtualReference",
        "support.class.state.properties":
            "$__reserved|$Attributes|$Background|$DoActivities|$Docu|$DoEvent|$EntryActivities|$EntryEvent|"+
            "$ExitActivities|$ExitEvent|$Icon|$LineId_NotUsed|$ReceiveConstraints|$SendContraints|$StateId|"+
            "$StateNameVisible|$TransActivity|$TransCallTriggerIntern|$TransCallTriggerVisible|"+
            "$TransChangeTrigger|$TransConstraints|$TransDisabledIfLockedForEdit|$TransDocu|$TransEventType|"+
            "$TransSendEvent|$TransStayConnected|$TransTargetState|$TransTimeAbsolut|$TransTimeRelativ",
        "support.class.transition.properties":
            "$__reserved|$Attributes|$Background|$DoActivities|$Docu|$DoEvent|$EntryActivities|$EntryEvent|"+
            "$ExitActivities|$ExitEvent|$Icon|$LineId_NotUsed|$ReceiveConstraints|$SendConstraints|$StateId|"+
            "$StateNameVisible|$TransActivity|$TransActivity|$TransActivity|$TransCallTriggerIntern|"+
            "$TransCallTriggerIntern|$TransCallTriggerIntern|$TransCallTriggerVisible|$TransCallTriggerVisible|"+
            "$TransCallTriggerVisible|$TransChangeTrigger|$TransChangeTrigger|$TransChangeTrigger|"+
            "$TransConstraints|$TransConstraints|$TransConstraints|$TransDisabledIfLockedForEdit|"+
            "$TransDisabledIfLockedForEdit|$TransDisabledIfLockedForEdit|$TransDocu|$TransDocu|$TransDocu|"+
            "$TransEventType|$TransEventType|$TransEventType|$TransSendEvent|$TransSendEvent|$TransSendEvent|"+
            "$TransStayConnected|$TransStayConnected|$TransStayConnected|$TransTargetState|$TransTargetState|"+
            "$TransTargetState|$TransTimeAbsolut|$TransTimeAbsolut|$TransTimeAbsolut|$TransTimeRelativ|"+
            "$TransTimeRelativ|$TransTimeRelativ",
        "support.class.system.attributes":
            "$AncestorGUID|$AncestorId|$AuditingInfo|$Author|$Background|$BaseClassId|$Checked|$ChildrenAdded|"+
            "$ChildrenCount|$ChildrenDeleted|$ClassGUID|$ClassId|$Connected|$Constraints|$Created|"+
            "$DeploymentState|$DisplayName|$Docu|$DontInheritMethods|$Editable|$EngineLastPar|$EngineStatus|"+
            "$EngineStatusAsText|$Icon|$Id|$Inheritance|$InstanceVersioning|$InternalName|"+
            "$KeyValueStorePhysicalGUID|$LastJobGUID|$LockedForEdit|$LogicalGUID|$MatchAll|$MaxIdAttrDef|"+
            "$MaxIdChildDef|$MaxIdMethDef|$MaxIdParentDef|$MaxIdStateDef|$Metaosject|$ModificationCount|$Modified|"+
            "$ModifiedOnNodes|$Name|$NextVersion|$Node|$ObjectDescription|$ObjType|$Online|$ParentsAdded|"+
            "$ParentsCount|$ParentsDeleted|$PhysicalGUID|$solicyIds|$PrevVersion|$PrivateObj|$StorageState|"+
            "$StorageTypeId|$User|$ValidControl|$ValidFrom|$ValidTo|$ValidToSaved|$VersionAccessInheritance|"+
            "$VersionAccessObjects|$VersionDate|$VersionGUID|$Viewable|$ViewTemplates",
        "keyword.navigation":
            "$AllAttributes|$AllChildren|$AllParents|$AttrDef|$ChildDef|$CommonRule|$CommonRuleParent|"+
            "$CurrentClientApplicationId|$CurrentNodeId|$CurrentProjectId|$CurrentProjectId|$CurrentRoleId|"+
            "$CurrentSessionId|$CurrentUserId|$DraggedMaterial|$DraggedTool|$EffectiveAttrDef|$EffectiveChildDef|"+
            "$EffectiveMethDef|$EffectiveParentDef|$EffectiveStateDef|$EffectiveTransDef|$Filter|$Local|$Material|"+
            "$MethDef|$ParentDef|$ParentTree|$Reload|$Search|$SearchIndex|$Self|$Settings|$StateDef|$Subset|$Tool|"+
            "$TransDef|$Tree|$TreeStructured|$Vector",
        "storage.type":
            "dim",
        "constant.language":
            "null|invalid|$invalid|"+
            "$MathE|$MathMaxAttrDefKey|$MathMaxDate|$MathMaxDateTime|$MathMaxDouble|$MathMaxGUID|$MathMaxInt|"+
            "$MathMaxObjref|$MathMaxTime|$MathMinAttrDefKey|$MathMinDate|$MathMinDateTime|$MathMinDouble|"+
            "$MathMinGUID|$MathMinInt|$MathMinObjref|$MathMinTime|$MathPI",
        "support.function":
            "Message|Print|PrintTable",
        "constant.language.boolean": "true|false"
    }, "identifier", true);
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";
   this.$rules = {
        "no_regex" : [
            {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : /\/\*/,
                next : "comment"
            }, {
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
            }, {
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
            }, {
                token : "variable", // variables
                regex : "@{1,2}[a-zA-Z_\\d]+"
            }, {
                token : "constant.language", // OID
                //regex : /[\\="' + "'{,][\s]*[0-9A-Fa-f]{1,3}\.[0-9A-Fa-f]{1,3}\.[0-9A-Fa-f]{1,8}\.[0-9A-Fa-f]{1,8}[\s]*[\\'" + '"};,]\b/
                regex: /[0-9A-Fa-f]{1,5}\.[0-9A-Fa-f]{1,5}\.[0-9A-Fa-f]{1,8}\.[0-9A-Fa-f]{1,8}/           
            }, {
                token : "constant.language", // GUID
                regex : /\{[a-fA-F\d]{8}-([a-fA-F\d]{4}-){3}[a-fA-F\d]{12}\}/
            }, {
                token : "constant.numeric", // hex
                regex : /0[xX][0-9a-fA-F]+\b/
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
            }, {
                token: "keyword",
                regex: /\$(Direct){0,1}(Classes|Instances|Templates)\s+Of/
            }, {
                token : [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
                ],
                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : "keyword",
                regex : "(?:" + kwBeforeRe + ")\\b",
                next : "start"
            }, {
                token : ["support.function", "paren.lparen"],
                regex: /(__attributeproperties|__methodproperties|__pqlfunction|__referenceproperties|__stateproperties|__systemattributes|__transitionproperties|Abs|AddDays|AddHours|AddMicroSeconds|AddMilliSeconds|AddMinutes|AddMonths|AddNanoSeconds|AddSeconds|AddYears|AppendArray|AppendSet|Array|AttrIdByName|AttrNameById|Base64Decode|Base64Encode|BoolArray|CalculateString|Char|CharCode|Compare|CompareSets|Count|CreateCSVToFile|CreateSet|CreateXML|CreateXMLToFile|Date|DateArray|DateDiff|DateTime|DateTimeArray|DateTimeDiff|DateTimeUTC|DateUTC|Day|DayOfWeek|DayOfYear|DaysInMonth|DeleteValue|Diff|DiffArray|DoubleArray|Extract|FieldCount|FieldIndex|FieldName|FieldNames|FileClose|FileIsEof|FileOpen|FileRead|FileReadLine|FileReadString|FileSeek|FileSetPos|FileTell|FileWrite|Format|FormatMessage|FromMem|GetPQLHeader|GetTicks|GetObjectsFromSet|GetTimezoneOffset|GUID|GUIDArray|HMACSHA1|Hour|HTMLDecode|HTMLEncode|InArray|IndexOf|InsertValue|Int|IntArray|Intersection|IntersectionArray|Invert|IsAccessible|IsAccessibleForRole|IsArray|IsAttributeDefined|IsBool|IsBoolArray|IsChildRefDefined|IsDate|IsDateArray|IsDateTime|IsDateTimeArray|IsDouble|IsDoubleArray|IsEmpty|IsGUID|IsGUIDArray|IsInt|IsIntArray|IsInvalid|IsLeapYear|IsMem|IsMemArray|IsMethodDefined|IsModified|IsNull|IsNumeric|IsObjRef|IsObjrefArray|IsParentRefDefined|IsStateDefined|IsString|IsStringArray|IsTime|IsTimeArray|IsTransitionDefined|Join|Left|Length|Lower|MathACos|MathASin|MathATan|MathATan2|MathCeil|MathCos|MathCosH|MathExp|MathFabs|MathFloor|MathFmod|MathLog|MathLog10|MathPow|MathSin|MathSinH|MathSqrt|MathTan|MathTanh|max|MemArray|Message|MessageActive|MicroSeconds|MilliSeconds|min|Minute|Month|NanoSeconds|Now|NowUTC|ObjrefArray|ParseAmount|ParseCSV|ParseDate|ParseEYE|ParsePQL|ParseXML|PercentDecode|PercentEncode|Pos|Print|PrintTable|Quarter|Random|RegExpMatch|RegExpReplace|Right|Round|RPos|SearchReplace|Second|SetFieldValue|SetTimezoneOffset|SetValue|SHA1|SortArray|Example|Split|StringArray|Substitute|SubStr|SupportedFeatureDetails|TagLocally|Time|TimeArray|TimeDiff|TimeUTC|ToArray|ToBool|ToBoolArray|ToDate|ToDateArray|ToDateTime|ToDateTimeArray|ToDouble|ToDoubleArray|ToGUID|ToGUIDArray|ToInt|ToIntArray|ToMem|ToMemArray|ToObjRef|ToObjrefArray|ToString|ToStringArray|ToTime|ToTimeArray|Translate|Trim|TrimLeft|TrimRight|TryTagLocally|Union|Upper|Value|WeekdayOfMonth|WeekNumber|WeekOfMonth|WeeksInYear|Year)(\s*)(?=\()/
            }, {
                token : ["punctuation.operator", "support.function.dom"],
                regex : /(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token : ["punctuation.operator", "support.constant"],
                regex : /(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token : keywordMapper,
                regex : identifierRe
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|[!$%&*+\-~]|==|=|!=|<=|>=|<<=|>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /\?|\:|\,|\;|\./,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start"
            }, {
                token : "paren.rparen",
                regex : /[\])}]/
            }, {
                token : "keyword.operator",
                regex : /\/=?/,
                next  : "start"
            }, {
                token: "comment",
                regex: /^#!.*$/
            }, {
            caseInsensitive: true
            }
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment_regex_allowed"
            }, {
                token : "comment",
                regex : "\\/\\/",
                next : "line_comment_regex_allowed"
            }, {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token : "text",
                regex : "\\s+|^$",
                next : "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "regex": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token : "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token : "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token : "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "function_arguments": [
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: "[, ]+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "comment_regex_allowed" : [
            {token : "comment", regex : "\\*\\/", next : "start"},
            {defaultToken : "comment"}
        ],
        "comment" : [
            {token : "comment", regex : "\\*\\/", next : "no_regex"},
            {defaultToken : "comment"}
        ],
        "line_comment_regex_allowed" : [
            {token : "comment", regex : "$|^", next : "start"},
            {defaultToken : "comment"}
        ],
        "line_comment" : [
            {token : "comment", regex : "$|^", next : "no_regex"},
            {defaultToken : "comment"}
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qqstring"
            }, {
                token : "string",
                regex : '"|$',
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                next  : "qstring"
            }, {
                token : "string",
                regex : "'|$",
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("no_regex") ]);
};

oop.inherits(PqlHighlightRules, TextHighlightRules);

exports.PqlHighlightRules = PqlHighlightRules;
});


ace.define("ace/mode/pql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/pql_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PqlHighlightRules = require("./pql_highlight_rules").PqlHighlightRules;

var Mode = function() {
    this.HighlightRules = PqlHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
       
    this.lineCommentStart = ";";
    
    this.$id = "ace/mode/pql";
}).call(Mode.prototype);

exports.Mode = Mode;
});
