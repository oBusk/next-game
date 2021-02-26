import dynamic from "next/dynamic";

// https://nextjs.org/docs/advanced-features/dynamic-import
const DynamicSimpleGame = dynamic(() => import("../components/SimpleGame"), {
    ssr: false,
});

export default function SimpleGameWrapper() {
    return <DynamicSimpleGame />;
}
