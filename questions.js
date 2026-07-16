// ACLS 題庫資料（社團法人台灣帕德魅迪克國際救護發展協會 TPIMDA）
// 來源：高級心臟救命術 課前練習題_260219.docx
// 解析依據：2025 AHA Guidelines for CPR and ECC（American Heart Association）
// 資料結構設計為可持續擴充：新增題目只需在 ACLS_QUESTIONS 陣列中 push 新物件即可。
// 欄位：id, category, question, options{A,B,C,D}, answer, explanation, image(選填)

const ACLS_CATEGORIES = {
  cpr: "高品質 CPR / BLS",
  aed: "AED 與電擊治療",
  arrest_rhythm: "心跳停止心律與初始處置",
  arrest_drug: "心跳停止用藥",
  brady: "心搏過緩",
  tachy: "心搏過速（PSVT／VT／AF）",
  reversible: "可逆病因（5H5T）",
  acs: "急性冠心症 / STEMI",
  stroke: "急性腦中風",
  airway: "呼吸道與通氣",
  rosc: "ROSC 後照護",
  special: "特殊臨床情境",
  team: "團隊動力學與溝通",
  rhythm_id: "心律圖辨識",
  chain: "生命存活之鏈"
};

const ACLS_QUESTIONS = [
{ id:1, category:"cpr", question:"成人高品質 CPR 的按壓頻率建議為：",
  options:{A:"60–80/min", B:"80–100/min", C:"100–120/min", D:"120–140/min"}, answer:"C",
  explanation:"2025 AHA 指引維持成人胸外按壓頻率建議為每分鐘 100–120 次，過快或過慢都會降低血流灌注效率。" },

{ id:2, category:"cpr", question:"成人胸外按壓深度建議為：",
  options:{A:"4 cm", B:"至少5 cm", C:"大於6 cm", D:"大於7 cm"}, answer:"B",
  explanation:"按壓深度應至少 5 公分（2 吋），但不宜超過 6 公分（2.4 吋），過深會增加損傷風險而未必提升灌流。" },

{ id:3, category:"cpr", question:"下列何者最能提升 CPR 品質？",
  options:{A:"每 5 分鐘換人", B:"儘量不停按壓、縮短中斷", C:"每次按壓後停 1 秒", D:"以更深按壓直到疼痛"}, answer:"B",
  explanation:"胸外按壓中斷會使冠狀動脈灌流壓迅速下降，2025 AHA 持續強調將按壓分率（chest compression fraction）最大化、減少中斷次數與時間。" },

{ id:4, category:"cpr", question:"進行高品質 CPR 時，下列哪一項最正確？",
  options:{A:"按壓時讓病人胸廓維持半收縮", B:"每次換人按壓間隔不超過 5 秒", C:"按壓時手肘彎曲，以免太用力", D:"按壓與放鬆時間應大致相同"}, answer:"D",
  explanation:"高品質 CPR 要求每次按壓後「完全回彈」，讓胸廓恢復原狀以利靜脈回流；按壓與放鬆時間應大致各半，手肘應打直以垂直施力。" },

{ id:5, category:"airway", question:"已建立氣管內管的通氣方式較正確的是：",
  options:{A:"30:2", B:"連續按壓＋每 6 秒 1 次通氣", C:"連續按壓＋每 2 秒 1 次通氣", D:"停止按壓才能通氣"}, answer:"B",
  explanation:"建立進階氣道後，按壓與通氣不再需要同步，持續按壓的同時每 6 秒給予 1 次呼吸（約每分鐘 10 次），避免過度通氣。" },

{ id:6, category:"aed", question:"使用 AED 時，下列何者正確？",
  options:{A:"分析心律時可以繼續按壓", B:"貼片位置可隨意", C:"分析心律時需停止按壓避免干擾", D:"看到病人抽搐立刻移除貼片"}, answer:"C",
  explanation:"AED 分析心律時按壓動作會造成偽影干擾判讀，須暫停按壓；貼片位置需依機器圖示正確放置於胸骨右側鎖骨下與左側腋中線。" },

{ id:7, category:"aed", question:"AED 貼上貼片後指示「不建議電擊」時，下一步最適當：",
  options:{A:"移除貼片", B:"立即恢復 CPR 2 分鐘後再分析", C:"等待救護車到", D:"改用同步整流"}, answer:"B",
  explanation:"「不建議電擊」代表目前為非可電擊心律，應立即恢復高品質 CPR，2 分鐘後 AED 會再次自動分析心律。" },

{ id:8, category:"chain", question:"根據統計，病人發生VF 倒地後，若沒有接受CPR，也未接受去顫電擊，每過一分鐘存活率約下降？",
  options:{A:"3-4%", B:"7-10%", C:"12-15%", D:"18-20%"}, answer:"B",
  explanation:"未經任何處置的目擊 VF 心跳停止，存活率每分鐘約下降 7–10%，這也是強調早期 CPR 與早期電擊的核心依據。" },

{ id:9, category:"arrest_rhythm", question:"下列何者屬「可去顫電擊的心律」？",
  options:{A:"PEA", B:"Asystole", C:"Ventricular fibrillation (VF)", D:"Sinus bradycardia"}, answer:"C",
  explanation:"可電擊心律僅包含心室顫動（VF）與無脈性心室頻脈（pVT），PEA 與 Asystole 皆為不可電擊心律。" },

{ id:10, category:"arrest_rhythm", question:"監視器呈現「幾乎一條線」的疑似心搏停止，最先應做：",
  options:{A:"直接宣告 Asystole", B:"立即電擊", C:"檢查導線及更換導程", D:"給 Amiodarone"}, answer:"C",
  explanation:"宣告 Asystole 前須先確認並非導線脫落、增益過低或導程選擇不當造成的假性平坦線（\"confirm asystole\" 原則），檢查後仍平坦才視為真正心搏停止。" },

{ id:11, category:"arrest_rhythm", question:"對於 VF/pVT 心跳停止，最關鍵的初始處置是：",
  options:{A:"立即給 Atropine", B:"立即去顫＋高品質 CPR", C:"先做 12 導程", D:"先給 Morphine"}, answer:"B",
  explanation:"可電擊心律的首要處置永遠是儘速電擊搭配高品質 CPR，2025 AHA 採單次電擊策略，電擊後立即恢復按壓、不中斷評估脈搏。" },

{ id:12, category:"arrest_rhythm", question:"對於 Asystole/PEA 心跳停止，最關鍵的初始處置是：",
  options:{A:"同步整流", B:"立即去顫", C:"高品質 CPR＋Epinephrine＋找可逆原因", D:"先給 Adenosine"}, answer:"C",
  explanation:"不可電擊心律的核心處置為高品質 CPR、儘早給予 Epinephrine，並積極尋找並處理 5H5T 可逆病因，Atropine 已自 2010 年起移出此流程。" },

{ id:13, category:"arrest_drug", question:"反覆 VF/pVT、已去顫多次後 Amiodarone 推注建議起始劑量：",
  options:{A:"75 mg", B:"150 mg", C:"300 mg", D:"450 mg"}, answer:"C",
  explanation:"頑固性 VF/pVT 於電擊與 Epinephrine 後仍持續時，Amiodarone 首劑為 300 mg IV/IO 快速推注，必要時第二劑再追加 150 mg。" },

{ id:14, category:"arrest_drug", question:"下列何者「不是」心跳停止流程中的常規用藥？",
  options:{A:"Epinephrine", B:"Amiodarone", C:"Atropine", D:"Lidocaine"}, answer:"C",
  explanation:"Atropine 對心跳停止（Asystole/PEA）已證實無助益，自 2010 年 AHA 指引即移除，2025 年版本持續維持此建議，僅用於症狀性心搏過緩。" },

{ id:15, category:"brady", question:"心搏過緩的第一線藥物（無禁忌）為：",
  options:{A:"Adenosine", B:"Atropine", C:"Amiodarone", D:"Verapamil"}, answer:"B",
  explanation:"症狀性心搏過緩的第一線藥物為 Atropine，若無效則考慮經皮節律器（TCP）或升壓藥物輸注。" },

{ id:16, category:"brady", question:"Atropine 的成人單次最大總劑量為：",
  options:{A:"2 mg", B:"3 mg", C:"4 mg", D:"5 mg"}, answer:"B",
  explanation:"Atropine 每次給予 1 mg IV，可每 3–5 分鐘重複，成人建議最大總劑量為 3 mg。" },

{ id:17, category:"brady", question:"當不穩定心搏過緩，Atropine 無效後，下列較合適的下一步：",
  options:{A:"經皮心臟節律器（TCP）或升壓輸注", B:"立即改給 Lidocaine", C:"立即非同步電擊", D:"只觀察即可"}, answer:"A",
  explanation:"Atropine 無效時，應立即準備經皮心臟節律器（TCP），或給予 Dopamine／Epinephrine 等升壓藥物輸注以提升心跳與灌流。" },

{ id:18, category:"brady", question:"不穩定心搏過緩給予輸注藥物 Dopamine 常用範圍：",
  options:{A:"2–10 mcg/min", B:"5–20 mcg/kg/min", C:"2–10 mcg/kg/min", D:"1–5 mcg/kg/min"}, answer:"B",
  explanation:"Dopamine 作為心搏過緩之升壓／變時性藥物輸注時，常用劑量範圍為 5–20 mcg/kg/min，依心跳與血壓反應調整。" },

{ id:19, category:"tachy", question:"不穩定 tachycardia 的首選處置通常是：",
  options:{A:"同步整流", B:"觀察", C:"Adenosine 先打再說", D:"Atropine"}, answer:"A",
  explanation:"病人若出現低血壓、意識改變、休克徵象、缺血性胸痛或急性心衰竭等不穩定徵象，無論心律型態為何，首選處置為同步整流。" },

{ id:20, category:"tachy", question:"Adenosine 第一次無效後，下一次劑量為：",
  options:{A:"6 mg", B:"9 mg", C:"12 mg", D:"18 mg"}, answer:"C",
  explanation:"穩定規則窄QRS心搏過速，Adenosine 首劑 6 mg 快速推注無效後，第二劑加倍為 12 mg。" },

{ id:21, category:"tachy", question:"成人 Af不穩定心搏過速需要同步整流，初始能量（雙相）較符合：",
  options:{A:"50J", B:"100J", C:"120J", D:"200J"}, answer:"D",
  explanation:"心房顫動等不規則心律基質不均勻，同步整流建議採較高初始能量（雙相 ≥200J），以提高首次整流成功率，避免低能量與重複電擊。" },

{ id:22, category:"tachy", question:"規則寬 QRS 同步整流初始能量通常為：",
  options:{A:"50J", B:"100J", C:"120J", D:"200J"}, answer:"B",
  explanation:"規則單型態寬 QRS 心搏過速（如穩定型 VT）同步整流初始能量建議為 100J（雙相）。" },

{ id:23, category:"acs", question:"ACS 初始處置常見包含：",
  options:{A:"Aspirin、評估缺氧給氧、硝化甘油、止痛等", B:"只用抗生素", C:"只打利尿劑", D:"只做 CPR"}, answer:"A",
  explanation:"急性冠心症初始處置以「MONA」概念為架構：Aspirin 儘早口嚼給予、Oxygen（僅缺氧時）、Nitroglycerin 緩解胸痛與降低前負荷、Morphine 於 NTG 無效時止痛。" },

{ id:24, category:"stroke", question:"根據現行規範，急性腦中風評估中，到院後腦部電腦斷層多少內須完成?",
  options:{A:"5 分鐘", B:"20 分鐘", C:"60 分鐘", D:"6 小時"}, answer:"B",
  explanation:"AHA Target: Stroke 建議 door-to-CT 影像完成時間目標為 25 分鐘以內，選項中最接近之時效為 20 分鐘，強調影像檢查須極早完成以利決定是否給予 tPA。" },

{ id:25, category:"stroke", question:"根據現行規範，靜脈血栓溶解（rtPA/alteplase）治療急性腦中風需在發作多少時間內?",
  options:{A:"1 小時內", B:"3 小時內", C:"4.5 小時內", D:"12 小時內"}, answer:"C",
  explanation:"缺血性腦中風給予靜脈血栓溶解劑（rtPA/alteplase）之治療時間窗為症狀發作後 4.5 小時內，需先排除禁忌症。" },

{ id:26, category:"rosc", question:"病人在CPR過程中若 EtCO₂ 長期 <10 mmHg，最可能代表：",
  options:{A:"CPR 品質不佳或循環差", B:"病人已清醒", C:"過度換氣造成氧合太好", D:"一定是 VF"}, answer:"A",
  explanation:"呼氣末二氧化碳（ETCO₂）反映心輸出量與肺血流，CPR 中持續 <10 mmHg 代表按壓品質不足或循環狀態極差，應優先改善按壓品質或更換按壓者。" },

{ id:27, category:"arrest_rhythm", question:"你在病房遇到 62 歲男性突然倒地，你確認病人無反應、無正常呼吸，摸頸動脈無脈搏，團隊到位後你分派：A 壓胸、B 準備 AED/除顫器、C 建立 IV/IO、D 準備 BVM 通氣，此時心電圖顯示 VF。此刻最適當的指令是：",
  options:{A:"先給 Epinephrine 再除顫", B:"立即除顫，之後立刻恢復 CPR", C:"先插管確保氣道再除顫", D:"先做 12 導程 ECG 再決定"}, answer:"B",
  explanation:"確認 VF 後應以最快速度電擊，電擊後立即恢復 CPR 2 分鐘，不應為建立氣道、給藥或做心電圖而延遲電擊時機。" },

{ id:28, category:"arrest_rhythm", question:"一名 70 歲女性在急診候診區昏倒，無反應、無呼吸、無脈搏，立即給予CPR後發現監視器顯示「近乎平坦線」，下一步最優先：",
  options:{A:"立即非同步去顫", B:"先給 Amiodarone 300 mg", C:"更換導程", D:"立刻同步整流 100 J"}, answer:"C",
  explanation:"疑似 Asystole 前須先確認導程與貼片，排除技術性因素造成的假性平坦線，確認後才依 PEA/Asystole 流程處置。" },

{ id:29, category:"arrest_drug", question:"CPR 後 6 分鐘，監視器仍 VF，已除顫 2 次，IV 已建立完成，下一個藥物策略較符合流程：",
  options:{A:"Amiodarone 150 mg 先打", B:"Epinephrine 1 mg IV push", C:"Atropine 1 mg IV push", D:"Adenosine 6 mg IV push"}, answer:"B",
  explanation:"依心跳停止流程，第 2 次電擊後若仍為頑固性 VF，下一步為給予 Epinephrine 1 mg IV，之後每 3–5 分鐘重複；Amiodarone 通常於後續電擊無效時再給。" },

{ id:30, category:"arrest_drug", question:"反覆 VF/pVT，已除顫多次、已給 Epinephrine，下一個抗心律不整藥物首選通常為：",
  options:{A:"Amiodarone 300 mg IV", B:"Verapamil 10 mg IV", C:"Digoxin 0.25 mg IV", D:"Furosemide 20 mg IV"}, answer:"A",
  explanation:"頑固性 VF/pVT 於多次電擊與 Epinephrine 後仍未恢復，首選抗心律不整藥物為 Amiodarone 300 mg IV 推注。" },

{ id:31, category:"tachy", question:"病人 23 歲、意識清醒，HR 190、規則窄 QRS、血壓正常，你先做頸動脈竇按摩後無效，下一步最適當：",
  options:{A:"Amiodarone 300 mg", B:"Adenosine 6 mg 快速 IV push 並沖管", C:"Epinephrine 1 mg", D:"Verapamil 10 mg 立刻推注（不需評估）"}, answer:"B",
  explanation:"穩定規則窄QRS心搏過速（PSVT）於迷走神經刺激無效後，首選藥物為 Adenosine 6 mg 快速靜脈推注並立即以生理食鹽水沖管。" },

{ id:32, category:"tachy", question:"病人 75 歲，規則寬 QRS tachycardia，有脈搏，BP 82/50，有冒冷汗且胸痛加重，你應優先：",
  options:{A:"同步整流", B:"觀察 10 分鐘再說", C:"先給 Atropine", D:"先做迷走刺激"}, answer:"A",
  explanation:"病人已出現低血壓、冒冷汗與胸痛加劇等不穩定徵象，無論寬QRS心律成因為何，應優先進行同步整流而非藥物觀察。" },

{ id:33, category:"special", question:"心跳停止 CPR 中，你評估可逆原因，病人有透析史，心電圖之前曾見尖 T 波，你最優先要處理的 5H/5T 可能是：",
  options:{A:"低血糖", B:"高血鉀", C:"低體溫", D:"肺栓塞"}, answer:"B",
  explanation:"透析病人合併心電圖尖直 T 波為高血鉀典型表現，屬 5H 中的 Hyperkalemia，應優先給予鈣劑穩定心肌並降鉀處置。" },

{ id:34, category:"rosc", question:"ROSC 後病人仍昏迷，你準備進入目標溫控/腦保護策略，下列哪個指示最合理：",
  options:{A:"立刻讓體溫下降到 33°C", B:"只要血壓正常就不用做", C:"不用理會體溫", D:"避免高熱、維持目標體溫管理並監測"}, answer:"D",
  explanation:"2025 AHA 對昏迷 ROSC 病人建議採目標體溫管理（TTM），持續體溫監測並積極避免發燒（>37.5°C），而非硬性規定單一低溫數值。" },

{ id:35, category:"stroke", question:"在急性腦中風流程中，需要最先要排除的原因為：",
  options:{A:"高血脂", B:"低血糖", C:"低血鈉", D:"高尿酸"}, answer:"B",
  explanation:"低血糖可完全模擬中風症狀，屬可立即逆轉之病因，因此在中風評估流程中須第一時間以手指血糖排除低血糖。" },

{ id:36, category:"chain", question:"你在社區活動現場看到 55 歲男性突然倒地，現場多人圍觀但無人作為。你上前確認病人無反應、無正常呼吸，此時最符合「生命存活之鍊」第一時間作為的是：",
  options:{A:"先找病史與藥單", B:"叫人打電話叫119，拿 AED 並開始 CPR", C:"先等家屬到場", D:"先給氧氣再說"}, answer:"B",
  explanation:"生命存活之鏈第一環為儘早辨識與啟動緊急救護系統，確認無反應無呼吸後應立即呼叫 119、指派他人取得 AED 並開始 CPR。" },

{ id:37, category:"chain", question:"在院外心跳停止情境中，「早期啟動急救系統」的最佳描述是：",
  options:{A:"等 CPR 做 5 分鐘再通報", B:"先發訊息問同事能不能來", C:"立即呼叫 119，並指定人員取 AED", D:"先去找電擊器放旁邊即可"}, answer:"C",
  explanation:"早期啟動急救系統強調「立即」求救並同步分工，發現病人無反應應立即撥打 119 並指定專人取得 AED，而非延遲通報。" },

{ id:38, category:"chain", question:"你在院外目擊心跳停止，AED 到場後顯示「建議電擊」，依生命存活之鍊概念，最正確流程：",
  options:{A:"先插管再電擊", B:"先給藥再電擊", C:"立即除顫，之後立刻恢復 CPR", D:"先做 12 導程 ECG 再電擊"}, answer:"C",
  explanation:"AED 判讀建議電擊時應立即執行電擊，電擊後不做脈搏或心律確認，直接恢復高品質 CPR 2 分鐘，其他處置皆不應延遲電擊時機。" },

{ id:39, category:"cpr", question:"成人單人 CPR 未置入高級氣道時，按壓與人工呼吸比例為？",
  options:{A:"15:2", B:"5:1", C:"10:2", D:"30:2"}, answer:"D",
  explanation:"未建立進階氣道的成人 CPR，無論單人或雙人施救，按壓與人工呼吸比例皆為 30:2。" },

{ id:40, category:"aed", question:"使用自動體外電擊去顫器（AED）時，下列哪個步驟最優先？",
  options:{A:"先給 2 分鐘 CPR 再開打開電源", B:"先貼上電極貼片再開打開電源", C:"先幫病人插管", D:"先打開電源"}, answer:"D",
  explanation:"取得 AED 後第一步應先打開電源，機器會以語音／圖示逐步引導後續貼片黏貼與分析步驟。" },

{ id:41, category:"cpr", question:"在成人心跳停止的流程中，下列何者是最快可用來確認是否需要啟動 CPR？",
  options:{A:"觸摸頸動脈脈搏與評估反應", B:"看心電圖節律", C:"測量血壓", D:"聽診心音"}, answer:"A",
  explanation:"現場最快速可行的評估方式是確認病人有無反應、有無正常呼吸並觸摸頸動脈脈搏（限時 10 秒內完成），以決定是否啟動 CPR。" },

{ id:42, category:"arrest_rhythm", question:"下列哪一種心律屬於「可電擊」心律？",
  options:{A:"心肌缺血性 ST 段下降", B:"心室顫動（VF）", C:"無脈性心博過緩", D:"心房顫動（AF）"}, answer:"B",
  explanation:"可電擊心律僅指心室顫動（VF）與無脈性心室頻脈（pVT），其餘選項均非心跳停止之可電擊心律。" },

{ id:43, category:"arrest_rhythm", question:"下列哪一種屬於「不可電擊（non-shockable）」心律？",
  options:{A:"心室顫動(VF)", B:"無脈性心室頻脈(pVT)", C:"心室自主節律(IVR)", D:"以上皆非"}, answer:"C",
  explanation:"心室自主節律（IVR）若無脈搏，屬於 PEA（無脈性電活動）的一種，為不可電擊心律，處置應以高品質 CPR、Epinephrine 與尋找可逆病因為主。" },

{ id:44, category:"arrest_drug", question:"對成人無脈性心室顫動或心室頻脈，第一劑 Epinephrine 建議劑量為？",
  options:{A:"3 mg IV", B:"0.1 mg IV", C:"6 mg IV", D:"1 mg IV"}, answer:"D",
  explanation:"心跳停止流程中 Epinephrine 每劑固定為 1 mg IV/IO，無論心律型態為可電擊或不可電擊皆相同。" },

{ id:45, category:"arrest_drug", question:"成人心搏停止時，Epinephrine 1 mg 給藥頻率為？",
  options:{A:"每 1 分鐘一次", B:"每 3–5 分鐘一次", C:"僅給一次即可", D:"每 10 分鐘一次"}, answer:"B",
  explanation:"Epinephrine 1 mg IV/IO 於心跳停止期間每 3–5 分鐘重複給予一次，為心跳停止流程中唯一的常規血管加壓藥物。" },

{ id:46, category:"reversible", question:"下列哪一項屬於「可逆因素」中 H 的內容？",
  options:{A:"高鉀血症或低鉀血症", B:"心包膜填塞", C:"高血糖", D:"張力性氣胸"}, answer:"A",
  explanation:"5H 包含 Hypovolemia（低血容）、Hypoxia（低血氧）、Hydrogen ion（酸中毒）、Hyper/hypokalemia（高/低血鉀）、Hypothermia（低體溫）；心包填塞與張力性氣胸屬於 5T。" },

{ id:47, category:"reversible", question:"ACLS 所提到的 5H 中，不包含下列何者",
  options:{A:"低血糖", B:"低體溫", C:"低血容", D:"低血氧"}, answer:"A",
  explanation:"5H 為低血容、低血氧、酸中毒（氫離子）、高/低血鉀、低體溫，低血糖並非 5H 的成員，屬於一般臨床鑑別診斷但非 ACLS 可逆病因清單項目。" },

{ id:48, category:"reversible", question:"針對「5T」可逆原因，下列何者屬於其中之一？",
  options:{A:"肺炎", B:"高血糖", C:"低血鈉", D:"血栓"}, answer:"D",
  explanation:"5T 包含 Tension pneumothorax（張力性氣胸）、Tamponade（心包填塞）、Toxins（中毒）、Thrombosis-pulmonary（肺栓塞）與 Thrombosis-coronary（冠狀動脈栓塞），血栓（Thrombosis）為其核心概念之一。" },

{ id:49, category:"brady", question:"成人症狀性心搏過緩（有低血壓、意識改變）時，首選藥物為？",
  options:{A:"Atropine", B:"Amiodarone", C:"Adenosine", D:"Lidocaine"}, answer:"A",
  explanation:"症狀性心搏過緩的第一線藥物為 Atropine 1 mg IV，無效則進入 TCP 或升壓藥物輸注。" },

{ id:50, category:"brady", question:"目前AHA指引中，Atropine 用於症狀性心搏過緩的第一次建議劑量為？",
  options:{A:"0.5 mg IV", B:"3 mg IV", C:"1 mg IV", D:"0.25 mg IV"}, answer:"C",
  explanation:"現行 AHA 指引將 Atropine 單次劑量定為 1 mg IV（每 3–5 分鐘可重複，總量上限 3 mg），較舊版 0.5 mg 的劑量已上修。" },

{ id:51, category:"brady", question:"對於無效的嚴重心搏過緩，使用 TCP 經皮節律器時，下列敘述何者正確？",
  options:{A:"可不需事先鎮靜", B:"只要有機器節律就可停止評估脈搏", C:"需確認心電圖與脈搏皆有改善", D:"固定心率 60 bpm 即可"}, answer:"C",
  explanation:"TCP 只是「電氣奪取（capture）」，必須同時確認心電圖出現每個 Spike 後跟隨寬 QRS，且觸診／監測到對應之有效脈搏（機械奪取），才代表節律器真正發揮作用；意識清醒病人應給予鎮靜止痛。" },

{ id:52, category:"tachy", question:"對於規則、窄 QRS 的穩定性 PSVT，首選急性靜脈注射藥物為？",
  options:{A:"Adenosine", B:"Lidocaine", C:"Amiodarone", D:"Atropine"}, answer:"A",
  explanation:"穩定型 PSVT 首選藥物為 Adenosine，透過短暫抑制房室結傳導以終止折返性心律。" },

{ id:53, category:"tachy", question:"使用 Adenosine 靜脈推注時，下列哪一點最重要？",
  options:{A:"緩慢推注 1 分鐘內給完", B:"快速推注並立即以生理食鹽水沖洗", C:"先稀釋成 50 mL 再點滴 30 分鐘", D:"與葡萄糖液混和輸注"}, answer:"B",
  explanation:"Adenosine 半衰期極短（不到 10 秒），必須快速靜脈推注並立即以生理食鹽水沖管，才能確保藥物到達心臟發揮作用。" },

{ id:54, category:"acs", question:"疑似 ACS 病人來院，最重要且應儘早給予的一項藥物為？",
  options:{A:"口服抗生素", B:"口服 Aspirin", C:"皮下注射 Heparin 一次", D:"靜脈注射 Nitroglycerin"}, answer:"B",
  explanation:"Aspirin 可抑制血小板凝集、減少血栓進展，只要無禁忌症應在疑似 ACS 病人到院後儘早口嚼給予（通常 160–325 mg）。" },

{ id:55, category:"acs", question:"對於急性胸痛懷疑 STEMI 病人，下列何者為第一步評估？",
  options:{A:"立刻安排心導管室", B:"取得 12 導程心電圖", C:"抽血看肌酸酐", D:"安排胸部 X 光"}, answer:"B",
  explanation:"急性胸痛病人到院後應在 10 分鐘內取得並判讀 12 導程心電圖，以決定是否啟動 STEMI 再灌流流程。" },

{ id:56, category:"acs", question:"急性 STEMI 若安排經皮冠狀動脈介入治療（PCI），從到院起算建議到血管打通的時間（door-to-balloon time）應小於？",
  options:{A:"30 分鐘", B:"60 分鐘", C:"90 分鐘", D:"120 分鐘"}, answer:"C",
  explanation:"STEMI 病人接受初級 PCI 之 door-to-balloon time 目標為 90 分鐘以內，以降低心肌壞死範圍與死亡率。" },

{ id:57, category:"airway", question:"插管後，當病人 SpO2 顯示 60%,該怎麼做?",
  options:{A:"檢査氣管內管是否滑脫", B:"檢査氧氣是否有開", C:"檢査是否有氣胸發生", D:"以上皆是"}, answer:"D",
  explanation:"插管後血氧驟降需系統性排查，包含管路滑脫、阻塞、張力性氣胸與設備因素（DOPE：Displacement, Obstruction, Pneumothorax, Equipment），三個選項皆為必要檢查項目。" },

{ id:58, category:"stroke", question:"下列哪一項狀況最應立即懷疑「中風」而啟動中風評估流程？",
  options:{A:"突發胸痛與冷汗", B:"突然一側肢體無力與口齒不清", C:"24 小時內反覆腹瀉", D:"慢性雙下肢水腫"}, answer:"B",
  explanation:"單側肢體無力合併口齒不清為典型中風徵象（對應 FAST 中的 Arm 與 Speech），應立即啟動中風評估流程並記錄最後正常時間。" },

{ id:59, category:"rosc", question:"對於 ROSC 後仍未清醒的病人，目標溫度管理（TTM）建議將體溫維持於？",
  options:{A:"30–32°C", B:"32–36°C", C:"36–38°C", D:"38–40°C"}, answer:"B",
  explanation:"ROSC 後昏迷病人建議之目標溫度範圍為 32–36°C（依 2025 更新亦可採較寬鬆之體溫控制並嚴格避免發燒），並持續監測至少 24 小時以上。" },

{ id:60, category:"rosc", question:"ROSC 後病人血壓偏低，下列哪一種處置較為適當？",
  options:{A:"給予大量低張液體", B:"目標平均動脈壓（MAP）≥ 65 mmHg", C:"儘量避免使用血管收縮劑", D:"血壓低時先停用氧氣"}, answer:"B",
  explanation:"ROSC 後血液動力學管理目標為平均動脈壓（MAP）≥ 65 mmHg，必要時應使用等張晶體液及血管加壓藥物，而非避免使用。" },

{ id:61, category:"airway", question:"氣管插管後初步確認管位的指標為？",
  options:{A:"胸廓起伏對稱", B:"聽診雙側呼吸音", C:"持續波形式 ETCO₂ 顯示", D:"SpO₂ 上升到 100%"}, answer:"B",
  explanation:"插管後的初步（immediate）臨床確認以視診胸廓起伏與聽診雙側呼吸音為主；持續波形式 ETCO₂（capnography）則是後續持續監測管路留在氣管內的黃金標準，兩者互補而非互斥。" },

{ id:62, category:"airway", question:"使用袋瓣面罩幫病人給氧時，最重要的是？",
  options:{A:"加快給氣速率以提高通氣量", B:"保證每次給氣 1 秒以上並觀察胸廓起伏", C:"每次給氣量越大越好", D:"可忽略面罩是否密合"}, answer:"B",
  explanation:"BVM 給氣應每次超過 1 秒、以看到胸廓起伏為目標，避免過快過大之通氣造成胃部脹氣與胸內壓上升，進而減少靜脈回流。" },

{ id:63, category:"rosc", question:"純氧給太高太久可能造成的問題為？",
  options:{A:"增加缺血心肌損傷", B:"誘發低血糖", C:"引起急性高血鈣", D:"抑制抗生素效果"}, answer:"A",
  explanation:"ROSC 後過度給氧造成的高血氧會增加活性氧自由基，加重缺血再灌流心肌與腦部損傷，故建議滴定氧氣使 SpO₂ 維持在 92–98%，避免高血氧與低血氧。" },

{ id:64, category:"rosc", question:"在心搏停止照護過程中，若 ETCO₂ 持續 <10 mmHg，最應優先考慮？",
  options:{A:"增加電擊能量", B:"提升按壓品質或更換按壓者", C:"增加 Atropine 劑量", D:"立即停止 CPR"}, answer:"B",
  explanation:"持續偏低的 ETCO₂ 反映按壓品質不佳或循環極差，應優先檢討並改善按壓深度、頻率與回彈，必要時更換疲勞的按壓者。" },

{ id:65, category:"special", question:"對於疑似低體溫導致心搏停止患者，下列處置何者較恰當？",
  options:{A:"復溫前先給大量利尿劑", B:"電擊次數不限，可持續多次", C:"持續 CPR 並合併主動復溫措施", D:"復溫完成前不必給藥"}, answer:"C",
  explanation:"低體溫心跳停止應持續高品質 CPR 並同步進行主動復溫，體溫過低時藥物與電擊效果可能不佳，需依體溫調整給藥與電擊間隔，而非完全不給藥。" },

{ id:66, category:"tachy", question:"下列哪一種心律，若病人血流動力學不穩定，可以考慮同步電擊（synchronized cardioversion）？",
  options:{A:"不穩定型心房顫動", B:"正常竇性心律合併 PVC", C:"心室顫動", D:"心電圖一直線"}, answer:"A",
  explanation:"同步電擊適用於有脈搏但血流動力學不穩定的心搏過速（如不穩定型心房顫動），心室顫動屬無脈心律應以非同步去顫處置，一直線則屬 Asystole。" },

{ id:67, category:"tachy", question:"同步電擊治療 AF 伴隨不穩定症狀時，常見的第一次能量建議為？",
  options:{A:"10–20J", B:"50–100J", C:"200J", D:"能量大小無所謂"}, answer:"C",
  explanation:"心房顫動屬不規則心律，同步整流建議採較高初始能量（雙相 200J），以提高首次電擊成功率。" },

{ id:68, category:"team", question:"在急救流程中，團隊領導者最重要的角色是？",
  options:{A:"親自執行所有技術操作", B:"大聲指責做錯的人", C:"清楚分工、下達指令並持續回饋", D:"只負責記錄時間即可"}, answer:"C",
  explanation:"高效急救團隊領導者應清楚分派角色、以封閉式溝通下達明確指令並持續給予回饋，而非親自包辦所有操作或指責團隊成員。" },

{ id:69, category:"special", question:"對於疑似敗血症導致血壓低且乳酸升高的病人，首要處置為？",
  options:{A:"立即給予大劑量類固醇", B:"立刻開刀", C:"儘速給予 30 mL/kg 等張晶體液及早期抗生素", D:"只需觀察即可"}, answer:"C",
  explanation:"敗血性休克之急救核心（Surviving Sepsis Campaign 與 AHA 建議一致）為儘速給予 30 mL/kg 等張晶體液並儘早使用抗生素，以恢復灌流並控制感染源。" },

{ id:70, category:"airway", question:"口咽呼吸道（OPA）適用於哪一類病人？",
  options:{A:"清醒且會嘔吐的病人", B:"無咽喉反射及嘔吐反射的無意識病人", C:"正在吃東西的病人", D:"僅有輕微嗜睡的病人"}, answer:"B",
  explanation:"OPA 僅適用於完全無咽喉反射及嘔吐反射的無意識病人，清醒或有反射的病人置入會誘發嘔吐甚至喉痙攣。" },

{ id:71, category:"airway", question:"使用鼻咽呼吸道（NPA）時，下列哪種情況較不適合？",
  options:{A:"懷疑顱底骨折或嚴重顏面外傷", B:"口腔張不開", C:"需要長時間使用口咽呼吸道", D:"有輕度嘔吐反射者"}, answer:"A",
  explanation:"懷疑顱底骨折或嚴重顏面外傷病人置入 NPA 有誤入顱腔的風險，屬相對禁忌，此時應改採其他呼吸道處置方式。" },

{ id:72, category:"aed", question:"CPR 過程中發現病人胸前有植入式心臟節律器或去顫器，貼電擊貼片時應？",
  options:{A:"恰好貼在裝置正上方", B:"貼片應避開裝置約 2.5 公分以上", C:"因為有裝置所以不需電擊", D:"改用單極電擊棒"}, answer:"B",
  explanation:"電擊貼片應避開植入式節律器或去顫器裝置至少約 2.5 公分（1 吋），以免影響電擊能量傳導或損壞裝置，仍需依心律決定是否電擊。" },

{ id:73, category:"special", question:"對於懷疑肺栓塞導致的 PEA，下列何者為較合適的處置？",
  options:{A:"立即給予大量葡萄糖", B:"考慮溶栓治療", C:"停止 CPR", D:"僅給予 Atropine"}, answer:"B",
  explanation:"肺栓塞（5T 中的 Thrombosis-pulmonary）導致之心跳停止，在持續 CPR 的同時可考慮經驗性給予溶栓治療（fibrinolytic therapy）。" },

{ id:74, category:"special", question:"對於嚴重高鉀血症伴心律不整，首要藥物為？",
  options:{A:"靜脈注射鈣劑（例如Calcium gluconate 葡萄糖酸鈣）", B:"口服利尿劑", C:"口服鉀離子補充劑", D:"只給氧氣即可"}, answer:"A",
  explanation:"嚴重高血鉀合併心律不整時，首要處置為靜脈注射鈣劑以穩定心肌細胞膜、降低心律不整風險，之後再處理降鉀與排鉀措施。" },

{ id:75, category:"acs", question:"下列哪一項屬於急性主動脈剝離的典型表現？",
  options:{A:"突發撕裂樣胸背痛", B:"慢性壓迫感胸痛", C:"胸悶合併上呼吸道症狀", D:"餐後出現胸口灼熱"}, answer:"A",
  explanation:"急性主動脈剝離典型表現為突發性、劇烈撕裂樣胸背痛，常放射至背部，需與 ACS 做鑑別診斷，避免誤用抗凝血或溶栓治療。" },

{ id:76, category:"cpr", question:"進行胸外按壓時，下列哪一項是正確的技術？",
  options:{A:"每次按壓後要讓胸廓完全回彈", B:"只按壓左胸以貼近心臟", C:"按壓頻率忽快忽慢", D:"按壓時兩手分開置於胸骨兩側"}, answer:"A",
  explanation:"正確按壓技術要求雙手掌根重疊置於胸骨下半部、垂直穩定施力，且每次按壓後須讓胸廓完全回彈以利靜脈回流。" },

{ id:77, category:"cpr", question:"成人 CPR 過程中更換按壓者的建議時間為？",
  options:{A:"每 30 秒", B:"每 1 分鐘", C:"約每 2 分鐘或感到疲勞時", D:"整個 CPR 過程不需更換"}, answer:"C",
  explanation:"按壓者體力約於 2 分鐘後開始下降而影響按壓深度品質，建議每 2 分鐘（或每個電擊/心律分析週期）更換按壓者，或提早於感覺疲勞時更換。" },

{ id:78, category:"airway", question:"對於裝有氣管插管的病人，進行 CPR 時給予人工呼吸的頻率大約為？",
  options:{A:"每分鐘 10 次，與按壓不同步", B:"每分鐘 30 次，配合按壓", C:"每分鐘 2 次即可", D:"不再需要給氧"}, answer:"A",
  explanation:"建立進階氣道後，通氣與按壓不需同步，建議每 6 秒給予 1 次呼吸（約每分鐘 10 次），持續按壓不中斷。" },

{ id:79, category:"team", question:"在 ACLS 團隊中負責藥物管理的人，最重要的任務是？",
  options:{A:"自行決定用藥內容", B:"依團隊領導口頭指令確認藥名、劑量與途徑", C:"只要記錄用藥時間即可", D:"專心準備輸液，不需確認藥物"}, answer:"B",
  explanation:"藥物負責人應採「封閉式溝通」，收到領導指令後覆誦確認藥名、劑量與給藥途徑，執行後回報，以降低給藥錯誤風險。" },

{ id:80, category:"arrest_drug", question:"下列哪一項是使用 Amiodarone 時需特別注意的副作用或風險？",
  options:{A:"短時間使用會立即造成肝衰竭", B:"可能造成血壓下降與心搏過緩", C:"一定會導致高血鉀", D:"使用一次就會產生嚴重過敏"}, answer:"B",
  explanation:"Amiodarone 快速輸注時常見副作用為低血壓與心搏過緩，給藥時應留意輸注速度並監測血壓與心律變化。" },

{ id:81, category:"chain", question:"在預防院內心跳停止的概念中，下列何者最接近「快速反應團隊（RRT）」的目的？",
  options:{A:"只負責宣導 CPR 教學", B:"盡早介入惡化中的病人，避免進展到心跳停止", C:"專門處理行政文書", D:"只在心跳停止後才出現"}, answer:"B",
  explanation:"快速反應團隊（RRT）的核心目的是及早辨識生命徵象惡化的住院病人並提前介入，避免病情惡化至心跳停止，屬於院內預防性照護的重要一環。" },

{ id:82, category:"tachy", question:"病人出現胸痛、出汗、噁心，血壓 80/50 mmHg，心律為窄 QRS 規則心搏過速 190 次／分，最適合的處置是？",
  options:{A:"立刻給口服止痛藥", B:"給予 Adenosine 緩慢點滴", C:"同步電擊整流", D:"先讓病人休息再觀察"}, answer:"C",
  explanation:"病人已出現低血壓等不穩定徵象，即使為窄QRS規則心律，處置仍應優先同步電擊整流，而非以點滴方式給予 Adenosine（Adenosine 須快速推注方能生效）。" },

{ id:83, category:"team", question:"在 ACLS 中，對病人家屬溝通時，下列何者較合宜？",
  options:{A:"僅使用醫學術語，不需解釋", B:"以清楚、誠實且同理的方式說明目前狀況與計畫", C:"避免與家屬說明，以免被質疑", D:"只在病人死亡後才與家屬溝通"}, answer:"B",
  explanation:"與家屬溝通應秉持清楚、誠實且具同理心的原則，適時說明病情進展與急救計畫，這也是 ACLS 團隊動力學中良好溝通的重要一環。" },

{ id:84, category:"cpr", question:"依照 ACLS 指引中表示，有關再次強調的高品質 CPR 精神中，下列何者錯誤？",
  options:{A:"壓得快—每分鐘至少 100–120 次/分", B:"壓得深—壓胸約 4–5 公分", C:"盡量減少壓胸中斷時間與次數", D:"每胸前完全彈起再壓下一下"}, answer:"B",
  explanation:"此敘述有誤：正確深度應為「至少 5 公分、不超過 6 公分」，而非「約 4–5 公分」，4 公分明顯不足以達到有效灌流深度。" },

{ id:85, category:"cpr", question:"當一個人倒地不起，叫喚病人後，發現沒有反應、沒有呼吸，大家來救援，檢查脈搏，發現無脈搏，接下來應考慮作何動作？",
  options:{A:"檢查氣道排除梗塞", B:"開始作哈姆立克急救術", C:"再打開一次呼吸道", D:"開始作心臟按摩"}, answer:"D",
  explanation:"確認無反應、無呼吸、無脈搏即符合心跳停止定義，應立即開始胸外按壓（CPR），而非重複評估呼吸道或執行哈姆立克法。" },

{ id:86, category:"chain", question:"無脈搏的急救流程中之次級評估（第二個 ABCD）的敘述何者為非？",
  options:{A:"ABCD 的「D」其意義在於電擊（Defibrillation）", B:"在沒脈搏的病人「A」會重新確認呼吸道", C:"ABCD 的「C」其意義在建立循環", D:"以上皆是"}, answer:"A",
  explanation:"傳統 ACLS 教學將評估分為初級與次級 ABCD：初級 ABCD 的「D」才是 Defibrillation（電擊）；次級 ABCD 的「D」則是 Differential Diagnosis（尋找並鑑別可逆病因，即 5H5T），故此敘述有誤。" },

{ id:87, category:"chain", question:"有關於生命存活之鏈的觀念是在強調環環相扣，第四個環是指？",
  options:{A:"儘早電擊", B:"儘早 ACLS", C:"儘早求救", D:"儘早 BLS"}, answer:"B",
  explanation:"傳統五環生命存活之鏈依序為：儘早求救／辨識、儘早 CPR、儘早電擊、儘早 ACLS（高級救命術）、儘早整合性心跳停止後照護，第四環即為儘早 ACLS。" },

{ id:88, category:"aed", question:"關於 AED（自動體外電擊器）的敘述何者有誤？",
  options:{A:"機器分析心律時，不需中斷壓胸，以維持高品質 CPR", B:"電擊前應大喊並作手勢「你離開、我離開、大家都離開」以確保安全", C:"為避免干擾分析，在晃動行駛中的救護車上，須將救護車停穩再行使用", D:"目擊病人倒地，除求救外，要趕快取得 AED 給予電擊"}, answer:"A",
  explanation:"此敘述有誤：AED 分析心律時按壓動作會造成訊號干擾，標準操作須暫停按壓以利機器正確判讀，並非「不需中斷」。" },

{ id:89, category:"brady", question:"當 Atropine 無效時，體外心律調節器用於下列那一個心律不整的使用時機最佳？",
  options:{A:"有嚴重症狀的心搏過緩（Bradycardia）", B:"第一度房室傳導阻滯（1st AV block）", C:"無脈搏的電活動（PEA）", D:"心室不跳（Asystole）"}, answer:"A",
  explanation:"經皮節律器（TCP）適用於 Atropine 無效之嚴重症狀性心搏過緩，對於 PEA 或 Asystole 等無脈心律並無效益，不建議常規使用。" },

{ id:90, category:"chain", question:"突發性心因性猝死（sudden cardiac arrest）最常見的起始心律為何？",
  options:{A:"Bradycardia", B:"PEA", C:"VF", D:"Asystole"}, answer:"C",
  explanation:"目擊性猝死最常見的起始心律為心室顫動（VF），這也是強調早期電擊、縮短發生至電擊時間可大幅提升存活率的原因。" },

{ id:91, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm1.jpeg",
  options:{A:"PSVT", B:"VF", C:"Af（心房纖維顫動）", D:"AF（心房撲動）"}, answer:"A",
  explanation:"圖為規則、窄QRS且心室率偏快之心律，符合陣發性上心室頻脈（PSVT）之特徵：R-R 規則、QRS 窄且無法辨識明確 P 波。" },

{ id:92, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm2.jpeg",
  options:{A:"PSVT", B:"VF", C:"Af（心房纖維顫動）", D:"AF（心房撲動）"}, answer:"B",
  explanation:"圖為完全不規則、無法辨識QRS型態、振幅雜亂之波形，為心室顫動（VF）的典型表現，屬可電擊心律應立即去顫。" },

{ id:93, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm3.png",
  options:{A:"PSVT", B:"VF", C:"Af（心房纖維顫動）", D:"AF（心房撲動）"}, answer:"D",
  explanation:"圖中可見規則鋸齒狀（sawtooth）之心房波，為心房撲動（atrial flutter, 本題選項標示為「AF」）的典型表現。" },

{ id:94, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm4.jpeg",
  options:{A:"PSVT", B:"VF", C:"Af（心房纖維顫動）", D:"AF（心房撲動）"}, answer:"C",
  explanation:"圖為 R-R 間期不規則、無明顯 P 波、以纖維顫動波（f 波）為基線之心律，符合心房纖維顫動（Af）之特徵。" },

{ id:95, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm5.gif",
  options:{A:"一度 AV block", B:"三度 AV block", C:"二度 AV block type II", D:"二度 AV block type I"}, answer:"A",
  explanation:"圖中每個 P 波後皆規則跟隨 QRS，但 PR 間期固定且延長（>0.2 秒），符合一度房室傳導阻滯（1st degree AV block）之特徵，通常不需立即處置。" },

{ id:96, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm6.gif",
  options:{A:"一度 AV block", B:"三度 AV block", C:"二度 AV block type II", D:"二度 AV block type I"}, answer:"D",
  explanation:"圖中可見 PR 間期逐漸延長、直到某次 P 波後未跟隨 QRS（脫落），呈現群組性節律（group beating），為二度房室傳導阻滯 Type I（Wenckebach）之典型表現。" },

{ id:97, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm7.gif",
  options:{A:"一度 AV block", B:"三度 AV block", C:"二度 AV block type II", D:"二度 AV block type I"}, answer:"C",
  explanation:"圖中 PR 間期固定不變，但突然出現未預期的 QRS 脫落，無漸進性延長，符合二度房室傳導阻滯 Type II（Mobitz II）之特徵，較 Type I 更具進展為完全房室阻滯之風險。" },

{ id:98, category:"rhythm_id", question:"下圖心律為何？", image:"media/rhythm8.gif",
  options:{A:"一度 AV block", B:"三度 AV block", C:"二度 AV block type II", D:"二度 AV block type I"}, answer:"B",
  explanation:"圖中 P 波與 QRS 完全各自獨立、彼此無關（房室分離），心室以緩慢的逸脫節律維持，符合三度（完全性）房室傳導阻滯之特徵，通常需要節律器介入。" },

{ id:99, category:"acs", question:"對於急性冠心症候群的初始一般治療原則，強調給予「MONA」，所謂「MONA」是指 Morphine、Oxygen、Nitroglycerin 及",
  options:{A:"Atropine", B:"Adenosine", C:"Aspirin", D:"Amiodarone"}, answer:"C",
  explanation:"MONA 為 Morphine、Oxygen（僅缺氧時給予）、Nitroglycerin、Aspirin 的字首縮寫，其中 Aspirin 是抗血小板治療的關鍵藥物，應儘早給予。" },

{ id:100, category:"acs", question:"先生主訴胸痛且十二導程心電圖發現V3、V4有 ST 段上升情形，請問其心肌受傷位置最可能是？",
  options:{A:"下壁", B:"中隔", C:"前壁", D:"外側"}, answer:"C",
  explanation:"胸前導程對應關係：V1–V2 為中隔、V3–V4 為前壁、V5–V6 為側壁，故 V3、V4 ST 段上升提示前壁心肌梗塞。" },

{ id:101, category:"acs", question:"女士主訴胸痛且十二導程心電圖發現II、III、aVF有 ST 段上升情形，請問其心肌受傷位置最可能是？",
  options:{A:"下壁", B:"中隔", C:"前壁", D:"外側"}, answer:"A",
  explanation:"下壁導程為 II、III、aVF，此三導程 ST 段上升提示下壁心肌梗塞，須留意合併右心室梗塞與心搏過緩之可能性。" },

{ id:102, category:"stroke", question:"急性腦中風一般治療下列敘述何者為誤？",
  options:{A:"血糖：若低血糖，給予 50% 葡萄糖水，若血糖 >185 mg/dl 注射 Insulin", B:"靜脈輸液：50 mL/h（避免 D5W 及過多輸液）", C:"血栓溶解劑（r-TPA）治療腦梗塞的黃金時間是發病 4.5 小時之內", D:"須讓病人維持體溫高於 38.5 度，以增加腦部血流"}, answer:"D",
  explanation:"此敘述有誤：急性腦中風應積極避免發燒／高體溫，因高體溫會加重腦部缺血損傷，並非「維持體溫高於 38.5 度」以增加腦血流。" },

{ id:103, category:"stroke", question:"急性冠心症（ACS）與急性腦中風（Stroke）的致病機轉與何者有關？",
  options:{A:"性別", B:"高血糖", C:"抽菸", D:"血栓形成"}, answer:"D",
  explanation:"ACS 與缺血性腦中風的共同核心致病機轉皆為動脈粥狀硬化斑塊破裂後引發血栓形成，阻塞冠狀動脈或腦血管而導致缺血。" },

{ id:104, category:"stroke", question:"在腦中風的 FAST的評估主要包含了四項徵候，下列何者除外？",
  options:{A:"舉手", B:"微笑", C:"說句話", D:"完整的神經學評估"}, answer:"D",
  explanation:"FAST 為 Face（微笑／臉部下垂）、Arm（舉手／單側無力）、Speech（言語含糊）、Time（記錄發作時間）的快速篩檢工具，設計目的即是簡化流程、不需完整神經學檢查即可快速警覺中風。" },

{ id:105, category:"tachy", question:"在處理任何脈搏心律問題時，第一步就是決定患者狀況是否穩定，不穩定症狀是指下列何者是？",
  options:{A:"低血壓", B:"CPR 後的意識不清", C:"心包填塞", D:"低血容"}, answer:"A",
  explanation:"評估心搏過速／過緩病人是否「不穩定」的經典徵象包括低血壓、急性意識改變、休克徵象、缺血性胸痛與急性心衰竭，低血壓即為其中最具代表性的指標之一。" },

{ id:106, category:"acs", question:"急性冠心症患者在做完 12 導程心電圖後，如果發現 II、III、aVF 有 ST 段上升，血壓 70/40 mmHg 下列處置何者正確？",
  options:{A:"使用血栓溶解劑", B:"做右側心電圖", C:"使用 Morphine 降低疼痛焦慮", D:"使用 NTG 降低後負荷"}, answer:"B",
  explanation:"下壁心肌梗塞合併低血壓應優先懷疑右心室梗塞，須立即做右側心電圖（V4R）確認；此時 Nitroglycerin 與 Morphine 皆會降低前負荷、加重低血壓，應避免使用。" },

{ id:107, category:"acs", question:"60 歲男性今因胸痛不適到急診求治，您高度懷疑他是急性冠心症的患者，請問下列何項檢查較符合診斷急性冠心症所必須執行的項目？",
  options:{A:"病史、心電圖與心肌酵素", B:"氧氣濃度", C:"動脈血分析", D:"胸部電腦斷層"}, answer:"A",
  explanation:"急性冠心症診斷之三大核心要素為詳細病史（含胸痛特徵）、12 導程心電圖判讀與心肌損傷標記物（如 Troponin）之連續追蹤。" },

{ id:108, category:"airway", question:"下列何種給氧方式，所提供之氧氣濃度可最高？",
  options:{A:"氧氣面罩（Simple mask）", B:"凡德里面罩 (Venturi mask)", C:"非再吸入型面罩（non-rebreathing mask）", D:"鼻導管（nasal cannula）"}, answer:"C",
  explanation:"非再吸入型面罩（NRB mask）搭配儲氧袋可提供最高濃度氧氣（約 60–90% 以上），高於簡易面罩、凡德里面罩與鼻導管。" },

{ id:109, category:"airway", question:"意識不清且有嘔吐反射的病人如果使用輔助呼吸道時，較適合使用？",
  options:{A:"口咽呼吸道管（oral airway）", B:"鼻咽呼吸道管（nasal airway）", C:"以上皆是", D:"以上皆非"}, answer:"B",
  explanation:"病人仍有嘔吐反射時，置入 OPA 容易誘發嘔吐甚至喉痙攣，鼻咽呼吸道（NPA）因不經口腔置放、耐受性較佳，較為合適（惟需注意顱底骨折等禁忌）。" },

{ id:110, category:"tachy", question:"依據 ACLS 流程圖觀念中提到，當病人心搏過速時，下列何種症狀需要考慮同步整流治療？",
  options:{A:"全身發熱，體溫高達 39.5 度", B:"全身盜汗，且意識不清", C:"用嗎啡減輕疼痛目前之不適", D:"過去曾有急性冠心症病史"}, answer:"B",
  explanation:"意識改變合併盜汗屬於典型不穩定徵象（休克徵象與急性意識改變），一旦出現即應優先考慮同步電擊整流，而非單純發燒或既往病史。" },

{ id:111, category:"tachy", question:"一位 50 歲、70 Kg 的男性病人，有心絞痛、糖尿病、高血壓等病史，到急診室求診，主訴胸痛、盜汗、心悸，心電圖呈現一型心室心搏過速（VT），心跳 160/min，血壓 70/40 mmHg，呼吸 26/min，優先處置為何？",
  options:{A:"Adenosine 6 mg 靜脈推注", B:"鎮靜病人後，100 焦耳同步整流", C:"Amiodarone 150 mg 靜脈推注", D:"立即予以 100 焦耳去顫電擊"}, answer:"B",
  explanation:"病人為有脈搏但血流動力學不穩定的單型態 VT（低血壓合併症狀），處置為鎮靜後執行同步整流（100J），而非去顫（非同步電擊僅用於無脈心律）。" },

{ id:112, category:"special", question:"若有一位經過心臟移植病史之病人主訴胸悶，心電圖顯示其心跳每分鐘 40 下，若無法取得體外心律調節器時，下列何者是最佳處理方式？",
  options:{A:"靜脈注射 Atropine 1mg", B:"靜脈滴注 Dopamine 5–20 μg/kg/min", C:"靜脈滴注 Isoproterenol 10–20 μg/kg/min", D:"靜脈注射 Epinephrine 1 mg"}, answer:"B",
  explanation:"心臟移植後的去神經化心臟對 Atropine（作用機轉為抑制迷走神經）反應不佳，無法取得 TCP 時應改採具變時性作用之升壓藥物輸注，如 Dopamine 5–20 μg/kg/min。" },

{ id:113, category:"brady", question:"關於使用經皮心律調節器（TCP），下列何者是錯？",
  options:{A:"意識清醒患者應給予麻醉性止痛劑或鎮靜劑", B:"監視器心電圖應有每一個 Spike 後，跟隨一寬 QRS", C:"病患若為竇性心搏過緩，每分鐘心跳 55 下，應為 TCP 使用時機", D:"橈動脈搏動時較監視器心跳數少，需將輸出增加"}, answer:"C",
  explanation:"此敘述有誤：單純竇性心搏過緩每分鐘 55 下、若病人無低血壓、意識改變等症狀，並非 TCP 之使用時機，TCP 僅用於「症狀性」心搏過緩。" },

{ id:114, category:"acs", question:"關於 Morphine 的作用，下列敘述何者正確？",
  options:{A:"可增加焦慮", B:"增加血管阻力", C:"血壓低於 90 mmHg 不可使用", D:"增加心臟耗氧量"}, answer:"C",
  explanation:"Morphine 具鎮靜、減少焦慮、靜脈擴張降低前負荷及降低心肌耗氧量之作用；因其會降低血管阻力並可能加重低血壓，故血壓低於 90 mmHg 時應避免或謹慎使用。" },

{ id:115, category:"arrest_drug", question:"下列何者不是使用 Amiodarone 的時機？",
  options:{A:"病人經過去顫電擊及 Epinephrine 給予後，仍有持續的心室纖維顫動（VF）", B:"治療穩定、單一型態的心室心搏過速（VT）", C:"病人呈現無脈搏心跳停止（Asystole）且經 CPR 無效", D:"治療穩定的心室上心搏過速 (SVT)"}, answer:"C",
  explanation:"Amiodarone 適用於頑固性 VF/pVT 及穩定型 VT／SVT 之心律控制，但對 Asystole（無電活動）並無藥理學上的角色，Asystole 處置應著重 CPR、Epinephrine 與尋找可逆病因。" },

{ id:116, category:"stroke", question:"腦中風的病人，欲使用 t-PA 治療，下列何者較為適當？",
  options:{A:"病人於中午 12 點到達醫院，家屬主訴，昨晚 11 點時患者可自行如廁", B:"病人於中午 12 點到達醫院，家屬主訴，中午 11 點時患者可自行如廁", C:"病人於中午 12 點到達醫院，家屬主訴，中午 11 點發現病人眼歪嘴斜，送到醫院之後，病人一切恢復正常", D:"病人於中午 12 點到達醫院，家屬主訴，上個月才發生過一次缺血性中風"}, answer:"B",
  explanation:"選項 B 之最後正常時間距到院僅約 1 小時，明確落在 4.5 小時治療時間窗內；選項 A 距發作已逾 13 小時超出時間窗，選項 C 症狀已完全緩解（疑似 TIA，需審慎評估），選項 D 近期中風病史為相對禁忌症，皆較不適合。" },

{ id:117, category:"tachy", question:"一位 27 歲病患發生 PSVT，已給用二次 Adenosine，心跳還是每分鐘 180，五分鐘後血壓由 120 mmHg 降至 70 mmHg，請問下一步為何？",
  options:{A:"0.5 mg Atropine 靜脈注射", B:"Isoproterenol 靜脈注射", C:"鎮靜止痛後，給予100 焦耳同步整流", D:"10 mg Verapamil 靜脈注射 1–2 分鐘"}, answer:"C",
  explanation:"病人於藥物治療無效後出現血壓下降，已轉為不穩定狀態，處置應立即改為鎮靜止痛後執行同步整流，而非再嘗試其他藥物。" },

{ id:118, category:"airway", question:"有關 BVM 的敘述,何者不正確?",
  options:{A:"使用於成年人，潮氣量約 6~7ml/kg", B:"在建立確切的呼吸道後不需配合壓胸給予通氣", C:"過度換氣，會增加胸腔內的壓力,減少回心血流,反而不利 CPR 的結果", D:"在 CPR 且未建立進階呼吸道時，每分鐘給予 8 次的通氣"}, answer:"D",
  explanation:"此敘述不正確：未建立進階氣道時，通氣應依 30:2 比例配合按壓給予，而非以「每分鐘 8 次」的固定速率獨立給氣；建立進階氣道後才改為每 6 秒 1 次（約 10 次/分）且與按壓不同步。" },

{ id:119, category:"airway", question:"關於輔助性呼吸道(Airway Adjunct)下列敘述何者正確?",
  options:{A:"無論是口咽或鼻咽呼吸道放置,均有相當風險,應經過專業訓練,了解適應症及不良反應", B:"鼻咽呼吸道很少會造成呼吸道出血(<10%),因此比口咽安全許多", C:"在懷疑顱底骨折(basal skull fracture)的病人中,放置鼻咽呼吸道比口咽安全", D:"尚有咽喉反射(gag reflex)的病人,放置鼻咽比口咽更易誘發嘔吐"}, answer:"A",
  explanation:"口咽與鼻咽呼吸道皆有其風險與禁忌症（如鼻咽呼吸道可能造成出血、顱底骨折病人應避免使用；口咽呼吸道可能誘發有反射病人嘔吐），使用前都應接受專業訓練並充分了解適應症與不良反應。" },

{ id:120, category:"airway", question:"2025 AHA 針對呼吸道及氧氣給予的介紹,下列何者為非?",
  options:{A:"在 CPR 當下使用 BVM 給 100%氧氣時,每次吹兩口氣,一口氣約 1 秒,5秒內給完2口氣", B:"通氣之潮氣量僅需見到胸部起伏即可,約 6~7ml/kg", C:"使用 BVM 通氣,最理想是由兩名醫療人員操作,一個維持呼吸道與面罩密合,另一個 bagging", D:"醫護人員獨自操作 CPR 及通氣時不建議使用 BVM,應以口對口人工呼吸較有效"}, answer:"D",
  explanation:"此敘述為非：單人施救時仍可使用 BVM 給氧，並非「應以口對口人工呼吸較有效」；2025 AHA 建議理想情況下由兩人操作 BVM（一人固定面罩密合、一人擠壓球體）以確保通氣品質。" }

];
