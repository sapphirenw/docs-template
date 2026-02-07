import { createDocPage } from 'doc-platform/handlers/doc-page';

const { DocPage, generateStaticParams, generateMetadata } = createDocPage();

export { generateStaticParams, generateMetadata };
export default DocPage;
