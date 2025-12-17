import { useState } from "react";
import PracticeLayout from "../components/practice/PracticeLayout";
import SidebarFilters from "../components/practice/SidebarFilters";
import UtilityPanel from "../components/practice/UtilityPanel";
import QuestionList from "../components/practice/QuestionList";
import QuestionPlayer from "../components/practice/QuestionPlayer";

export default function Practice() {
  const [currentView, setCurrentView] = useState<'list' | 'player'>('list');
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [subject, setSubject] = useState('phy');

  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
    setCurrentView('player');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedQuestion(null);
  };

  return (
    <PracticeLayout
      sidebar={<SidebarFilters subject={subject} setSubject={setSubject} />}
      utilityPanel={<UtilityPanel />}
    >
      {currentView === 'list' ? (
        <QuestionList subject={subject} onSelectQuestion={handleSelectQuestion} />
      ) : (
        selectedQuestion && (
          <QuestionPlayer
            question={selectedQuestion}
            onBack={handleBackToList}
            subject={subject}
          />
        )
      )}
    </PracticeLayout>
  );
}
