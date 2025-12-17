import { useState } from "react";
import PracticeLayout from "../components/practice/PracticeLayout";
import SidebarFilters from "../components/practice/SidebarFilters";
import UtilityPanel from "../components/practice/UtilityPanel";
import QuestionList from "../components/practice/QuestionList";
import QuestionPlayer from "../components/practice/QuestionPlayer";

export default function Practice() {
  const [currentView, setCurrentView] = useState<'list' | 'player'>('list');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestionId(id);
    setCurrentView('player');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedQuestionId(null);
  };

  return (
    <PracticeLayout
      sidebar={<SidebarFilters />}
      utilityPanel={<UtilityPanel />}
    >
      {currentView === 'list' ? (
        <QuestionList onSelectQuestion={handleSelectQuestion} />
      ) : (
        <QuestionPlayer onBack={handleBackToList} />
      )}
    </PracticeLayout>
  );
}
