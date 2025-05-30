import Block from '~/components/Block';
import { useDesktop } from '~/hooks/useDesktop';

export default function HistoryPage() {
  const isDesktop = useDesktop();
  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="w-[100%] p-[20px]">
        <h1 className="text-2xl font-bold mb-4">Закладки</h1>
        <p>Здесь будут отображаться сохраненные объявления</p>
      </div>
    </Block>
  );
}
