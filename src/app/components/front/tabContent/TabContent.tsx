import TabContentArticle from './tabContentArticle/TabContentAritlce';
import TabContentNotice from './tabContentNotice/TabContentNotice';

export default function TabContent({tab = 'article'}: {tab?: string}) {

  return (
    <div>
      {tab === 'article' && <TabContentArticle />}
      {tab === 'notice' && <TabContentNotice />}
    </div>
  );
}